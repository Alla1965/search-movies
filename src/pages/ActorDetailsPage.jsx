import { useEffect, useState, useRef  } from 'react';
import { getPersonDetails } from '../services/tmdbAPI';
import { ArrowLeft } from 'lucide-react';
import { useParams, useLocation, Outlet, Link } from 'react-router-dom';

  const ActorDetailsPage = ({ isDark, t,  language }) => {
  const { actorId } = useParams();
  const location = useLocation();//сохраняет текущий адрес
    
// useRef для збереження попереднього місця переходу
  const backLinkRef = useRef(location.state?.from ?? '/');
  const [person, setPerson] = useState(null);
  const [isEnglishBiography, setIsEnglishBiography] = useState(false);

useEffect(() => {
  const loadActor = async () => {
    try {
      setIsEnglishBiography(false);
     
      const { data } = await getPersonDetails(actorId, language);
  
        if (language === "uk" && !data.biography) {
          const { data: englishData } = await getPersonDetails(actorId, "en");

          setPerson({
            ...data,
            biography: englishData.biography,
        });

        setIsEnglishBiography(Boolean(englishData.biography));
        return;
        }

          setPerson(data);
        } catch (error) {
          console.error("Error fetching actor  details:", error.message);
        }
  };

  loadActor();
}, [actorId, language]);
    
  if (!person) return <p className='text-base md:text-lg xl:text-xl px-10'>
    Loading...</p>;

  return (
    <>

   {/* кнопка для возврата на страницу со списком */}
       <Link to={backLinkRef.current}
            className={`inline-flex items-center text-center 
              gap-2 py-2.5 px-4 mb-6 rounded-lg my-2 mx-10 
              shadow-[5px_5px_10px_grey] text-base md:text-lg xl:text-xl
              ${isDark ? "bg-card-dark"
                             : "bg-card-light text-text-light" } ` }>

        <ArrowLeft size={20}  />
        
       {t.goBack} 
       </Link>
       
       <div className='flex flex-col md:flex-row gap-6 mx-10 text-base  mb-4'>
  
         <div className='flex flex-col'>  
           <img className='w-full max-h-[70vh] object-contain md:w-[300px] md:max-h-[80vh] h-auto'
                  src={`https://image.tmdb.org/t/p/w300${person.profile_path}`}
                 alt={person.name} /> 

         <div className={`inline-flex items-center justify-center text-center w-28 gap-2 py-2.5 px-4 mb-6
                         text-black rounded-lg my-2 mx-10 shadow-[3px_3px_5px_grey] 
                          ${isDark ?  "bg-card-dark text-text-dark"
                            : "bg-card-light text-text-light" }`}>
           
            <Link to={`/actor/${actorId}/movies`} state={{ from: location }}>
                  {t.actorMovies}</Link>
                 
         </div>

         <Outlet /> 
  
         </div>

     
         <div className={`p-5 w-full text-base md:text-lg xl:text-2xl
                          ${isDark ?  " bg-bg-dark text-text-dark " 
                                    : " bg-bg-light  text-text-light"}`}>

           <h1 className='text-4xl font-semibold mb-4'> {person.name}</h1>

           <h2  >{t.placeOfBirth} </h2>
           <p className=' mb-8 italic text-[#646cff]'>{person.place_of_birth}</p>

           <div className='flex'>
              <div className='flex items-center gap-2 mb-2'>

               <h2  className='font-bold'> {t.birthday} </h2>
               <p className='mr-6 italic'>{(person.birthday)}</p>

               {person.deathday && (
                   <>
                    <h2>{t.deathDay}</h2>
                    <p className="italic">{person.deathday}</p>
                   </>
                )}
            </div>
           </div>

           <div className='flex gap-2 mt-auto  text-base md:text-lg xl:text-2xl items-center mb-2'>
                    <h2 className='font-bold'>{t.knowForDepartment}</h2>
                    <p className='mr-6 italic'>{t.departments?.[person.known_for_department] || person.known_for_department} </p>
            </div>

            <h2>{t.biography}</h2>

             {isEnglishBiography && (
               <p className="text-sm text-[#646cff] italic">
                 {t.biographyFallback}
               </p>
             )}

            <p className='mb-4 italic font-normal'>{person.biography || t.noOverview}</p>
        
         </div>

       </div>

     
    </> 
  );
};

export default ActorDetailsPage;
