import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getMovieReviews } from '../../services/tmdbAPI';

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movieId)
      .then(({ data }) => setReviews(data.results))
      .catch(error => console.error('Error fetching reviews:', error));
  }, [movieId]);

  if (reviews.length === 0) {
    return <p>No reviews available for this movie.</p>;
  }

  return (
    <ul>
      {reviews.map(({ id, author, content }) => (
        <li key={id}>
          <p><strong>{author}:</strong></p>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
