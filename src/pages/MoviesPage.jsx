import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies, getCountries, getGenres, getMoviesByFilters} from '../services/tmdbAPI';
import NotFoundPage from '../pages/NotFoundPage';
import MovieList from '../components/MovieList';
import TitleSearchForm from '../components/TitleSearchForm';
import CountrySearchForm from '../components/CountrySearchForm'

const MoviesPage = ({ isDark,  t, language}) => {
  

  const [movies, setMovies] = useState([]);// movies — список найденных фильмов.
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
            } else {
                  let sortedResults = [...data.results];

           if (sortBy === "vote_average.desc") {         
             sortedResults.sort((a, b) => b.vote_average - a.vote_average);
             }

             if (sortBy === "vote_average.asc") {         
             sortedResults.sort((a, b) => a.vote_average - b.vote_average);
             }

            if (sortBy === "primary_release_date.desc") {         
              sortedResults.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
             }

             if (sortBy === "primary_release_date.asc") {
              sortedResults.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
             }
              
                 setMovies(sortedResults);
                 setTotalResults(data.total_results);
                 setTotalPages(data.total_pages);
                  setCurrentPage(data.page);
                  setErrorMessage(null);
         
            }
          })
      .catch(err => {
                 setErrorMessage('An error occurred while searching. Please try again later.');
                 console.error('Error searching movies:', err.message);
                 setMovies([]);
               });
     }, [query, sortBy]);

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
        } else {
            
              setMovies(data.results);
              setTotalResults(data.total_results);
              setTotalPages(data.total_pages);
              setCurrentPage(data.page);
              setErrorMessage(null);
              // setIsModalOpen(true);
         
        }
      })
      .catch(err => {
        setErrorMessage('An error occurred while searching. Please try again later.');
        console.error('Error searching movies:', err.message);
        setMovies([]);
        // setIsModalOpen(false);
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
     getGenres(language)
    .then(({ data }) => {
      setGenres(data.genres);
    })
    .catch(error => {
      console.error('Error loading genres:', error.message);
    });
   }, [language]);

// Эта функция запускается, когда пользователь нажимает кнопку Search или Enter в поле поиска.

    const handleTitleSubmit = e => {
      e.preventDefault();
      const trimmedQuery = titleValue.trim();
           setGenreValue('');
           setCountryValue('');
      
      if (trimmedQuery) {
         setSearchParams({ query: trimmedQuery });
      }

      if (trimmedQuery === query && movies.length > 0) {
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
            //  setIsModalOpen(true);
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
  setTotalResults(0);
  setTotalPages(0);
  setCurrentPage(1);
};

// Сброс для Country
const handleCountryClear = () => {
  setMovies([]);
  setErrorMessage(null);
  setCountryValue("");
  setSearchParams({});
  setGenreValue('');
  setTotalResults(0);
  setTotalPages(0);
  setCurrentPage(1);
};

  return (
    <div className='mx-10 mb-10'>
      <h1 className='my-10'>{t.searchMovies}</h1>
     

      {/* Search Title */}
      <div className={`mx-auto my-8 rounded-xl p-6 shadow-lg border
        ${isDark ? "bg-card-dark border-white/10" : "bg-card-light border-border-light" } `}>
         
       <TitleSearchForm
          titleValue={titleValue}
          setTitleValue={setTitleValue}
          handleTitleSubmit={handleTitleSubmit}
          handleTitleClear={handleTitleClear}
          isDark={isDark}
          t={t}
        />
      </div>
      

      {/* Search Production countries */}
      <div className={` mx-auto my-8 rounded-xl p-6 shadow-lg border mb-10
       ${isDark ? "bg-card-dark border-white/10"
        : "bg-card-light border-border-light" } `}>
        <CountrySearchForm
          countryValue={countryValue}
          setCountryValue={setCountryValue}
          handleCountrySubmit={handleCountrySubmit}
          handleCountryClear={handleCountryClear}
          genres={genres}
          genreValue={genreValue}
          setGenreValue={setGenreValue}
          countries={countries}
          isDark={isDark}
            t={t}
            language={language }
        />

      {errorMessage && <NotFoundPage message={errorMessage} />}
   
  
     
      </div>

      <MovieList 
              movies={movies}
              totalResults={totalResults}
              totalPages={totalPages}
              currentPage={currentPage}
              onSeeMore={handleSeeMore}
              sortBy={sortBy}
              onSortChange={setSortBy}
              isDark={isDark}
                t={t}
             />

    </div>
  );
};

export default MoviesPage;
