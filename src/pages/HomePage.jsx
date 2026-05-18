import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../services/tmdbAPI';
import MovieList from '../components/MovieList/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies()
      .then(({ data }) => setMovies(data.results))
        .catch(error =>
            console.error('Error fetching trending movies:', error.message));
  }, []);

  return (
    <div>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
