import { useEffect, useState } from 'react';
import ActorSearchForm from '../components/ActorSearchForm';
import { useSearchParams } from 'react-router-dom';
import { searchActors } from '../services/tmdbAPI';
import CastList from '../components/CastList';

const CastSearchPage = ({ isDark,  t}) => {
 
    const [actorValue, setActorValue] = useState('');
    const [totalResults, setTotalResults] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [actors, setActors] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const actor = searchParams.get('actor') || '';
    const [errorMessage, setErrorMessage] = useState(null); // тільки одне джерело помилки
      
    useEffect(() => {
                
           if (!actor) return;
      
            searchActors(actor)
      
         .then(({ data }) => {
        
            setActors(data.results);
             console.log("all actors:", data.results);
           if (data.results.length === 0) {
             setErrorMessage('No actors found. Try another query.');
             setActors([]); 
            } else {
            setTotalResults(data.total_results);
            setTotalPages(data.total_pages);
            setCurrentPage(data.page);
            }
         })
         .catch(err => {
           setErrorMessage('An error occurred while searching. Please try again later.');
           console.error('Error searching actors:', err.message);
           setActors([]);
                });
     }, [actor]); 

    const handleSeeMoreActors = () => { 
    const nextPage = currentPage + 1;

    if (actor) {
     searchActors(actor, nextPage)
       .then(({ data }) => {
          setActors(previousActors => [
          ...previousActors,
          ...data.results,
        ]);

          setCurrentPage(data.page);
        })
       .catch(error => {
        console.error('Error loading more actors:', error.message);
      });
  }
    };
     

// Эта функция запускается, когда пользователь нажимает кнопку Search или Enter в поле поиска.
    const handleActorSubmit = e => {
      e.preventDefault();
      const trimmedQuery = actorValue.trim();
           setActorValue('');
      
      if (trimmedQuery) {
         setSearchParams({ actor: trimmedQuery });
      }
    };


     // Сброс для Actor
      const handleActorClear = () => {
         setErrorMessage(null);
         setActorValue('');
         setSearchParams({});
         setActors([]);
         setTotalResults(0);
      };


return (
    <div className='mx-10 mb-10'>
      <h1 className='my-10'>{t.searchActors}</h1>
     

      {/* Search Tittle */}
      <div className={`mx-auto my-8 rounded-xl p-6 shadow-lg border
        ${isDark ? "bg-card-dark border-white/10"
                 : "bg-card-light border-border-light" } `}>
         
       <ActorSearchForm         
          actorValue={actorValue}
          setActorValue={setActorValue}
          handleActorSubmit={handleActorSubmit}
          handleActorClear={handleActorClear}
          isDark={isDark}
          t={t} />
      </div>
    

      <CastList 
              actors={actors}
              totalResults={totalResults}
              totalPages={totalPages}
              currentPage={currentPage}
              onSeeMore={handleSeeMoreActors}
              isDark={isDark}
              t={t}
             />

    </div>
  );

    }
  
export default CastSearchPage;
