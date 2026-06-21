import { useEffect, useState, useRef  } from 'react';
import { getMovieDetails } from '../services/tmdbAPI';
import { ArrowLeft } from 'lucide-react';
import { useParams, useLocation, Outlet, Link } from 'react-router-dom';

  const MovieDetailsPage = ({ isDark, t,  language }) => {
  const { movieId } = useParams();
  const location = useLocation();//сохраняет текущий адрес
  const backLinkRef = useRef(location.state?.from ?? '/');// useRef для збереження попереднього місця переходу
  const [movie, setMovie] = useState(null);
  const [isEnglishFallback, setIsEnglishFallback] = useState(false);
  

   useEffect(() => {
     if (!movieId) {
      return;
    }

   const loadMovie = async () => {
        try {
         setIsEnglishFallback(false);

          const { data } = await getMovieDetails(movieId, language);

        if (language === "uk" && !data.overview) {
          const { data: englishData } = await getMovieDetails(movieId, "en");

         setMovie({
          ...data,
          overview: englishData.overview,
        });

        setIsEnglishFallback(Boolean(englishData.overview));
        return;
      }

          setMovie(data);
          } catch (error) {
           console.error("Error fetching movie details:", error.message);
      }
     };

     loadMovie();
     }, [movieId, language]);
      
     if (!movie) return <p className='text-base md:text-lg xl:text-xl px-10'>
     Loading...</p>;

// переводит код языка фильма в понятное название языка.
  const languageName = new Intl.DisplayNames([language],
     { type: 'language' }).of(movie.original_language) ;

  const regionNames = new Intl.DisplayNames([language], {
    type: "region",
   });

 
  return (
    <>

   {/* кнопка для возврата на страницу со списком */}
       <Link to={backLinkRef.current}
            className={`inline-flex items-center text-center gap-2 py-2.5 px-4 mb-6
                 rounded-lg
                 my-2 mx-10 shadow-[5px_5px_10px_grey] text-base md:text-lg xl:text-xl
                 ${isDark ? "bg-card-dark"
                             : "bg-card-light text-text-light" }
                 ` }>

        <ArrowLeft size={20}  />
        
       {t.goBack} 
       </Link>
       
       <div className='flex flex-col md:flex-row gap-6 mx-10 text-base  mb-4'>
          <img className='w-full max-h-[70vh] object-contain md:w-[300px] md:max-h-[80vh] h-auto'
               src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
               alt={movie.title}
               />
     
           <div className={`p-5 w-full text-base md:text-lg xl:text-2xl
                           ${isDark ?  " bg-bg-dark text-text-dark " 
                                    : " bg-bg-light  text-text-light"} `}>

               <h1 className='text-4xl font-semibold mb-4'>
                  {movie.title}
                 {movie.release_date && `(${movie.release_date.slice(0, 4)})`}
               </h1>

               <h2>{t.originalTitle}: </h2>

               <p className=' mb-8 italic text-[#646cff]'>{movie.original_title}</p>

               <div className='flex items-center gap-2 mb-2'>
                <h2> {t.rating}: </h2>
                <p className='mr-6 italic'>{(movie.vote_average * 10).toFixed(0)}%</p>
                <h2  > {t.totalVotes}: </h2>
                <p className='italic'>{(movie.vote_count ).toFixed(0)}</p>
               </div>

               <h2>{t.overview}</h2>

               {isEnglishFallback && (
                  <p className="text-sm text-[#646cff] italic">
                   {t.overviewFallback}
                  </p>
             )}

            <p className='mb-4 italic font-normal'>{movie.overview || t.noOverview}</p>

            <h2> {t.genre}: </h2> 
            <p className='mb-4 italic'>{movie.genres?.map(genre => genre.name).join(', ')}</p>

            <h2> {t.originalLanguage}:</h2> 
             <p className='mb-4 italic'> {languageName}</p>

            <h2> {t.productionCountries}:</h2> 
           
            <p className='mb-4 italic'> {movie.production_countries?.map(country => regionNames.of(country.iso_3166_1))
              .join(', ')}</p>
           </div>

       </div>

       <div className='flex flex-col justify-center gap-6 mx-10   
                       text-base md:text-lg xl:text-2xl'>

          <h2 className='text-2xl md:text-3xl xl:text-4xl text-center'> {t.addInfo}</h2>

          <ul className={`flex flex-col justify-center md:flex-row gap-4 `}>

          <li className={`inline-flex items-center justify-center text-center w-28 gap-2 py-2.5 px-4 mb-6
                         text-black rounded-lg my-2 mx-10 shadow-[3px_3px_5px_grey] 
                          ${isDark ?  "bg-card-dark text-text-dark"
                                   : "bg-card-light text-text-light" } `}>
           
             <Link to={`/movies/${movieId}/cast`} state={{ from: location }}> {t.cast}</Link>
     
          </li>

          <li className={`inline-flex items-center text-center justify-center gap-2 py-2.5 px-4 mb-6
                 rounded-lg w-28
                 my-2 mx-10 shadow-[3px_3px_5px_grey] 
                 ${isDark ?  "bg-card-dark text-text-dark"
                            : "bg-card-light text-text-light" }
                `}>
            <Link to={`/movies/${movieId}/reviews`} state={{ from: location }}> {t.reviews} </Link>
     
          </li>
      </ul>

        <Outlet /> 
       </div> 

    </> 
  );
  };

export default MovieDetailsPage;
