import { useEffect, useState } from 'react';
import { fetchTrendingMovies } from '../services/tmdbAPI';
import MovieList from '../components/MovieList';
import StarIcon from '../components/icons/StarIcon';

const HomePage = ({isDark, t}) => {
   const [movies, setMovies] = useState([]);
   const [sortBy, setSortBy] = useState("vote_average.desc");

  useEffect(() => {
    fetchTrendingMovies()
      .then(({ data }) => {setMovies(data.results);})
        .catch(error =>
            console.error('Error fetching trending movies:', error.message));
  }, []);

   
  return (

       <div className='mx-10 pb-10'>
        <div className=' flex flex-col gap-5 '>

          <div className='flex gap-3 mt-6'>
            <StarIcon />
            <p className='text-accent-light font-bold'>{t.popular}</p>
           </div>

          <h1 className=' text-5xl font-bold'> {t.trend} </h1>
          <p className={` ${isDark ?  "text-muted-dark" : " text-muted-light "}`}>
               {t.discover}
          </p>
          
          </div>
          <MovieList movies={movies} isDark={isDark} sortBy={sortBy}  onSortChange={setSortBy} t={t} />
       </div>
  );
};

export default HomePage;
