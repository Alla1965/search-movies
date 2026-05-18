import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import css from "./MovieCast.module.css"

import { getMovieCredits } from '../../services/tmdbAPI';

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {

    getMovieCredits(movieId)
      .then(({ data }) => setCast(data.cast))
      .catch(error => console.error('Error fetching movie cast:', error));
  }, [movieId]);

  if (cast.length === 0) {
    return <p>No cast information available.</p>;
  }


  return (

    <ul className={css.castList}>
  {cast.map(({ id, name, character, profile_path }) => (
    <li className={css.castItem} key={id}>
      {profile_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w200${profile_path}`}
          alt={name}
          className={css.castImg}
          width="100"
        />
      ) : (
        <div className={css.noPhoto}>Немає фото</div>
      )}
      <p className={css.castName}><strong>{name}</strong></p>
      <p className={css.castCharacter}>as {character}</p>
    </li>
  ))}
</ul>

  );
};

export default MovieCast;
