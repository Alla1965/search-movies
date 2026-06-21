import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getMovieCredits, getMovieDetails } from '../services/tmdbAPI';
// import { Link } from 'react-router-dom';

const CastModal = ({isDark,t,language}) => {

   const { movieId } = useParams();
   const [cast, setCast] = useState([]);
   const [movie, setMovie] = useState(null);
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false);

  
      useEffect(() => {
      setIsLoading(true);

       Promise.all([
        getMovieCredits(movieId),
        getMovieDetails(movieId, language)
       ])
       .then(([creditsResponse, movieResponse]) => {
       setCast(creditsResponse.data.cast || []);
        setMovie(movieResponse.data);
       })
       .catch(error => {
         console.error('Error loading movie data:', error.message);
       })
       .finally(() => {
         setIsLoading(false);
       });
      }, [movieId, language]);

      if (isLoading) {
        return <p>Loading...</p>;   }

      if (cast.length === 0) {
      return <p>No cast information available.</p>;}
                
     return (
       <div className={`fixed inset-0 flex justify-center 
                        items-center p-8 
                        ${isDark ? "bg-black/70 text-text-dark" 
                                 : "bg-slate-900/40 text-text-light"}  `}
              onClick={() => navigate(`/movies/${movieId}`)}>

            <div className={`w-[90%]  max-h-[80vh]
                           overflow-y-auto border  border-black rounded-2xl
                           ${isDark ? " bg-card-dark text-text-dark"
                            : "bg-card-light text-text-light" }`}
                 onClick={e => e.stopPropagation()}>

              {/* Block: Title   */}
              
              <div className='flex flex-col items-center justify-center gap-2'>

                <h2 className="text-xl md:text-2xl xl:text-3xl font-semibold text-center">
                   {t.actorsList} 
                </h2>

                 <div className='text-lg md:text-xl xl:text-2xl font-normal text-center text-[#646cff]'>
                        {movie?.title} 
                 </div> 
              </div>

              {/* Button CLOSE       */}
             <button className={`close-button absolute right-4 top-4  text-4xl
                                 py-3 pr-4 focus:outline-none hover:outline-none hover:border-transparent
                                 focus:ring-0
                                  `}
                      type="button"  
                      onClick={() => navigate(-1)}>
               ˣ
             </button>

     
               {!isLoading && cast.length > 0 && (
                <ul className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6 w-full 
                               list-none p-10 '>

                 {cast.map(actor => (
                   <li  className='w-48 mx-auto rounded-3xl'
                        key={actor.id}>

                       {actor.profile_path ? (
                       <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                            alt={actor.name}
                            className='w-full aspect-[2/3]  object-cover 
                                         mx-auto mb-4'  />
                       ) : (
                       <div className='bg-[#ccc]  w-full aspect-[2/3] text-sm
                                  flex items-center justify-center 
                                  rounded-3xl p-1 mx-auto mb-4'>
                                    No photo
                       </div>
                 )}

                     <Link to={`/actor/${actor.id}`}
                           className='text-base md:text-lg xl:text-xl 
                           font-semibold text-center'>{actor.name}
                     </Link>

                 {actor.character && (
                     <p className= 'font-normal'>as {actor.character}</p>
                      )}
                 </li>

                  ))}

                </ul>
              )} 

           </div>
           
         </div>
       
    );
  
};

export default CastModal;
