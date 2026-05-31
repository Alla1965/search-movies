import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import { getPersonMovieCredits } from '../services/tmdbAPI';
import { getPersonDetails } from '../services/tmdbAPI';
import { Link } from 'react-router-dom';

 const PersonMoviesModal = () => {

 const { personId } = useParams();
 const [isLoading, setIsLoading] = useState(false);
 const [movies, setMovies] = useState([]);
 const location = useLocation();
 const [person, setPerson] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
  getPersonDetails(personId)
    .then(({ data }) => {
      setPerson(data);
    })
    .catch(error => {
      console.error('Error loading person details:', error.message);
    });
}, [personId]);

           useEffect(() => {
                 setIsLoading(true);

                 getPersonMovieCredits(personId)
                   .then(({ data }) => {
                     setMovies(data.cast);
                                       })
                   .catch(error => {
                     console.error('Error loading cast:', error.message);
                   })
                   .finally(() => {
                    setIsLoading(false);
                   });
               }, [personId]);


     return (
         <div className="fixed inset-0 flex justify-center items-center bg-black/70 p-8"
              onClick={() => navigate('/movies')}>
           <div className="bg-white w-full max-h-[80vh]
                           overflow-y-auto border  border-black rounded-2xl"
                onClick={e => e.stopPropagation()}>
             <button className='flex bg-white ml-auto text-4xl py-3 pr-4 '
                    type="button"  
                    onClick={() => navigate('/movies')}>
               ˣ
             </button>
           
               {isLoading && <p>Loading...</p>}

              {!isLoading && movies.length === 0 && (
              <p>No movies information available.</p>
               )}
              <div className='flex flex-col justify-center gap-2'>
                <h2 className="text-xl md:text-2xl xl:text-3xl font-semibold text-center">
                    Movies with 
                </h2>
                <div className='text-lg md:text-xl xl:text-2xl font-normal text-center text-[#646cff]'>
                        {person?.name}
                        </div>
              </div>

               {!isLoading && movies.length > 0 && (
                
                <ul className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6 w-full 
                               list-none p-10 '>
                 {movies.map(movie  => (
                 
                 <li 
                    className='w-50 block mx-auto'
                    key={movie.credit_id}>
                       {movie.poster_path? (
                       <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                            className='w-full aspect-[2/3] rounded-sm object-cover 
                                         mx-auto mb-4'  />

                  ) : (
                    <div className='bg-[#ccc] text-[#44] w-full aspect-[2/3] text-sm
                                  flex items-center justify-center 
                                  rounded-sm p-1 mx-auto mb-4'>
                                    No photo</div>
                )}

                     <Link 
                          to={`/movies/${movie.id}`}
                          state={{ from: location }}
                          className='text-base md:text-lg xl:text-xl 
                                   font-semibold text-center'>
                      {movie.title}</Link>

                     {movie.character && (
                      <p className="font-normal text-center">
                        as {movie.character}
                      </p>
)}
                      
                 </li>

                  ))}
                </ul>
              )}  
           </div>
           
         </div>
       
    );
}
export default PersonMoviesModal;