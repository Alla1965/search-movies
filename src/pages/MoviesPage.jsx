import { useEffect, useState } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';

import { searchMovies } from '../services/tmdbAPI';
import { getCountries } from '../services/tmdbAPI';
import { getGenres } from '../services/tmdbAPI';
import { getMoviesByFilters } from '../services/tmdbAPI';

import NotFoundPage from '../pages/NotFoundPage';

import MoviesModal from '../components/MoviesModal';
import TitleSearchForm from '../components/TitleSearchForm';
import CountrySearchForm from '../components/CountrySearchForm'

const MoviesPage = () => {

// movies — список найденных фильмов.
  const [movies, setMovies] = useState([]);
   
  const [countries, setCountries] = useState([]);

  const [totalResults, setTotalResults] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query') || '';
  const country = searchParams.get('country') || '';
  const genre = searchParams.get('genre') || '';
 
  const [titleValue, setTitleValue] = useState('');
  const [errorMessage, setErrorMessage] = useState(null); // тільки одне джерело помилки
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const [genres, setGenres] = useState([]);
  const [genreValue, setGenreValue] = useState('');
  const [countryValue, setCountryValue] = useState("");
  const [sortBy, setSortBy] = useState('vote_average.desc');

  // useEffect для поиска по названию
  
   useEffect(() => {
        if (!query) return;
   
    searchMovies(query)
   
      .then(({ data }) => {
        
        if (data.results.length === 0) {
          setErrorMessage('No movies found. Try another query.');
          setMovies([]); 
           setIsModalOpen(false);
        } else {
              setMovies(data.results);
              setTotalResults(data.total_results);
              setTotalPages(data.total_pages);
              setCurrentPage(data.page);
              setErrorMessage(null);
              setIsModalOpen(true);
         
        }
      })
      .catch(err => {
        setErrorMessage('An error occurred while searching. Please try again later.');
        console.error('Error searching movies:', err.message);
        setMovies([]);
        setIsModalOpen(false);
      });
  }, [query]);

  // useEffect для поиска по СТРАНЕ и жанру
  
   useEffect(() => {
    
       if (!country && !genre) return;
         getMoviesByFilters({
           countryCode: country,
            genreId: genre,
            sortBy: sortBy,
          })
   
      .then(({ data }) => {
               if (data.results.length === 0) {
          setErrorMessage('No movies found. Try another query.');
          setMovies([]); 
           setIsModalOpen(false);
        } else {
            
              setMovies(data.results);
              setTotalResults(data.total_results);
              setTotalPages(data.total_pages);
              setCurrentPage(data.page);
              setErrorMessage(null);
              setIsModalOpen(true);
         
        }
      })
      .catch(err => {
        setErrorMessage('An error occurred while searching. Please try again later.');
        console.error('Error searching movies:', err.message);
        setMovies([]);
        setIsModalOpen(false);
      });
  }, [country, genre, sortBy]);

  // Загрузка списка стран
    useEffect(() => {
       getCountries()
    .then(({ data }) => {
              setCountries(data);
    })
    .catch(error => {
      console.error('Error loading countries:', error.message);
    });
    }, []);

// Загрузка жанров
   useEffect(() => {
     getGenres()
    .then(({ data }) => {
      setGenres(data.genres);
    })
    .catch(error => {
      console.error('Error loading genres:', error.message);
    });
}, []);

// Эта функция запускается, когда пользователь нажимает кнопку Search или Enter в поле поиска.
    const handleTitleSubmit = e => {
     e.preventDefault();
      const trimmedQuery = titleValue.trim();
           setGenreValue('');
      
      if (trimmedQuery) {
         setSearchParams({ query: trimmedQuery });
      }

      if (trimmedQuery === query && movies.length > 0) {
         setIsModalOpen(true);
      return;
     }
     };

    const handleCountrySubmit = e => {
         e.preventDefault();

         const countryCode = countryValue.trim();

        
         if (!countryCode && !genreValue) {
           setErrorMessage('Please select a country or genre.');
           return;
         }

         const params = {};
           if (countryCode) {
            params.country = countryCode;
          }

          if (genreValue) {
            params.genre = genreValue;
          }

          if (countryCode === country && genreValue === genre && movies.length > 0) {
             setIsModalOpen(true);
              return;
           }

          setTitleValue('');
          setSearchParams(params);

     };
 
    const handleSeeMore = () => {
    const nextPage = currentPage + 1;

   if (query) {
     searchMovies(query, nextPage)
      .then(({ data }) => {
        setMovies(previousMovies => [...previousMovies, ...data.results]);
        setCurrentPage(data.page);
      })
      .catch(error => {
        console.error('Error loading more movies:', error.message);
      });

    return;
    }

   if (country || genre) {
      getMoviesByFilters({
      countryCode: country,
      genreId: genre,
      page: nextPage,
      sortBy,
    })
      .then(({ data }) => {
        setMovies(previousMovies => [...previousMovies, ...data.results]);
        setCurrentPage(data.page);
      })
      .catch(error => {
        console.error('Error loading more movies:', error.message);
      });
  }
};

// Сброс для Title
const handleTitleClear = () => {
  setMovies([]);
  setErrorMessage(null);
  setTitleValue('');
  setSearchParams({});
  setIsModalOpen(false);
};

// Сброс для Country
const handleCountryClear = () => {
  setMovies([]);
  setErrorMessage(null);
  setCountryValue("");
  setSearchParams({});
  setIsModalOpen(false);
   setGenreValue('');
};

  return (
    <div className='mx-10 mb-10'>
      <h1 className='mb-10'>Search Movies</h1>
       <hr className="my-6 border-blue-900" />

{/* Search Tittle */}

       <TitleSearchForm
          titleValue={titleValue}
          setTitleValue={setTitleValue}
          handleTitleSubmit={handleTitleSubmit}
          handleTitleClear={handleTitleClear}
        />

      <hr className="my-6 border-blue-900" />

{/* Search Production countries */}
     
        <CountrySearchForm
          countryValue={countryValue}
          setCountryValue={setCountryValue}
          handleCountrySubmit={handleCountrySubmit}
          handleCountryClear={handleCountryClear}
          genres={genres}
          genreValue={genreValue}
          setGenreValue={setGenreValue}
          countries={countries}
        />

      {errorMessage && <NotFoundPage message={errorMessage} />}

        {isModalOpen && movies.length > 0 && (
          <MoviesModal  movies={movies}
                        location={location}
                        totalResults={totalResults}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        onSeeMore={handleSeeMore} 
                        onClose={() => setIsModalOpen(false)}
                        sortBy={sortBy}
                        onSortChange={setSortBy}
          />              
        )}
     
    </div>
  );
};

export default MoviesPage;
