
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

    useEffect(() => {
            
    getMovieDetails(movieId)
      .then(({ data }) => setMovie(data))
      .catch(error => {
        console.error('Error fetching movie details:', error.message);
      });
    }, [movieId]);
    
      
  if (!movie) return <p>Завантаження...</p>;

  return (
    <>
      <Link to={backLinkRef.current} className={css.btnBack}>
  <ArrowLeft size={20} style={{ marginRight: '8px' }} />
  Go back
</Link>
      

    <div className={css.movieContainer}>
        <img
          src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
          alt={movie.title}
        />
      <div className={css.movieProperty}>
        <h1 className={css.movieTitle}>{movie.title}({movie.release_date.slice(0, 4)})</h1>
  <p>Рейтинг: {movie.vote_average * 10}%</p>
         <h2>Overview</h2> 
        <p>{movie.overview}</p>
        <h2>Genres</h2> 
       <p>{movie.genres.map(genre => genre.name).join(', ')}</p>
    
      </div>

    </div>
    <div className={css.addInfo}>
<h2 className={css.titleAddInfo}> Additional information</h2>
<ul>
          <li className={css.addItem}>
           
                  <Link to={`/movies/${movieId}/cast`} state={{ from: location }}>Cast</Link>
     
    </li>
          <li className={css.addItem}>
            <Link to={`/movies/${movieId}/reviews`} state={{ from: location }}>Reviews</Link>
     
    </li>
  </ul>
        <Outlet /> 
      </div> 
    </> 
  );
};

export default MovieDetailsPage;
