
import { useEffect, useState, useRef  } from 'react';
import { getMovieDetails } from '../../services/tmdbAPI';
import css from "./MovieDetailsPage.module.css"
import { ArrowLeft } from 'lucide-react';

import { useParams, useLocation, Outlet, Link } from 'react-router-dom';

const MovieDetailsPage = () => {
    const { movieId } = useParams();
  const location = useLocation();
    
// useRef для збереження попереднього місця переходу
  const backLinkRef = useRef(location.state?.from ?? '/');

  
  const [movie, setMovie] = useState(null);



const languageName = movie
  ? new Intl.DisplayNames(['en'], { type: 'language' }).of(movie.original_language)
  : '';


    useEffect(() => {
            
    getMovieDetails(movieId)
      .then(({ data }) => {
         setMovie(data)})
      .catch(error => {
        console.error('Error fetching movie details:', error.message);
      });
    }, [movieId]);
    
      
  if (!movie) return <p className='text-base md:text-lg xl:text-xl px-4'>
    Loading...</p>;

  return (
    <>
   
      <Link to={backLinkRef.current} 
            className='inline-flex items-center text-center gap-2 py-2.5 px-4 mb-6
                 text-black bg-white rounded-lg
                 my-2 mx-10 shadow-[5px_5px_10px_grey] text-base md:text-lg xl:text-xl'>
        <ArrowLeft size={20} style={{ marginRight: '8px' }} />
        Go back
       </Link>
      

   
       <div className='flex flex-col md:flex-row gap-6 mx-10 text-base  mb-4'>
          <img className='w-full h-auto'
               src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
               alt={movie.title}
               />
     
           <div className='p-10 w-full bg-[#FCF8F6] text-base md:text-lg xl:text-2xl'>
             <h1 className='text-4xl font-semibold mb-4'>

              {movie.title}({movie.release_date.slice(0, 4)})</h1>

              <div className='flex items-center gap-2 mb-2'>
               <h2  >Рейтинг: </h2>
               <p>{(movie.vote_average * 10).toFixed(2)}%</p>
              </div>
         
            <h2>Overview</h2> 
            <p className='mb-4'>{movie.overview}</p>
            <h2>Genres</h2> 
            <p className='mb-4'>{movie.genres.map(genre => genre.name).join(', ')}</p>
            <h2>Original language:</h2> 
            <p className='mb-4'> {languageName}</p>
            <h2>Production countries</h2> 
            <p> {movie.production_countries.map(country=>country.name).join(', ')}</p>
           </div>

       </div>

     <div className='flex flex-col p-10 md:flex-row gap-6 mx-10 my-3 ml-10 
                     text-base md:text-lg xl:text-2xl'>

      <h2 className=''> Additional information</h2>

      <ul>
          <li className={css.addItem}>
           
                  <Link to={`/movies/${movieId}/cast`} state={{ from: location }}>Cast</Link>
     
          </li>

          <li className=''>
            <Link to={`/movies/${movieId}/reviews`} state={{ from: location }}>Reviews</Link>
     
          </li>
      </ul>
        <Outlet /> 
      </div> 
    </> 
  );
};

export default MovieDetailsPage;
