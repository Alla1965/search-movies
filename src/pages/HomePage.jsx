import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../services/tmdbAPI';
import MovieList from '../components/MovieList';

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies()
      .then(({ data }) => {setMovies(data.results)})
        .catch(error =>
            console.error('Error fetching trending movies:', error.message));
  }, []);

   
  return (
    <div className='mx-[60px] py-[60px]'>
      <h1 className='pb-8'>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
