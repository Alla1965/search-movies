import { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation, Link } from 'react-router-dom';
import { getPersonMovieCredits, getPersonDetails  } from '../services/tmdbAPI';

 const PersonMoviesModal = ({ isDark, t }) => {
 const { actorId  } = useParams();
 const [isLoading, setIsLoading] = useState(false);
 const [movies, setMovies] = useState([]);
 const location = useLocation();
 const [person, setPerson] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
  getPersonDetails(actorId )

    .then(({ data }) => {
      setPerson(data);
    })
    .catch(error => {
      console.error('Error loading person details:', error.message);
    });
}, [actorId ]);

           useEffect(() => {
                 setIsLoading(true);

                 getPersonMovieCredits(actorId )
                   .then(({ data }) => {
                     setMovies(data.cast);
                                       })
                   .catch(error => {
                     console.error('Error loading cast:', error.message);
                   })
                   .finally(() => {
                    setIsLoading(false);
                   });
               }, [actorId ]);
 
     return (
         <div className={`fixed inset-0 flex justify-center items-center
           bg-black/70 p-8
            
           `}
              onClick={() => navigate(`/actor/${actorId}`)}>
           <div className={`w-full max-h-[80vh]
                           overflow-y-auto border  border-black rounded-2xl
                           ${isDark ? "!bg-card-dark text-card-dark" 
                                    : "bg-card-light text-text-light"} 
                           `}
                onClick={e => e.stopPropagation()}>

          {/* Button CLOSE    */}
             <button className={`flex bg-white ml-auto text-4xl py-3 pr-4
                                  ${isDark ? " !bg-card-dark text-text-dark"
                                          : "bg-card-light text-text-light"}
             `}
                    type="button"  
                    onClick={() => navigate(`/actor/${actorId}`)}>
               ˣ
             </button>
           
              {isLoading && <p>Loading...</p>}

              {!isLoading && movies.length === 0 && (
              <p>No movies information available.</p>
               )}

              <div className='flex flex-col justify-center items-center gap-2'>
                <h2 className={`text-xl md:text-2xl xl:text-3xl font-semibold text-center
                            ${isDark ? "!bg-card-dark text-text-dark" 
                                     :  "text-text-light" } `}>
                  
                    Movies with 
                </h2>
                <div className="text-lg md:text-xl xl:text-2xl 
                      font-normal text-center text-[#646cff]" >
                        {person?.name}
                </div>
              </div>

               {!isLoading && movies.length > 0 && (
                
                <ul className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 
                               gap-6 w-full 
                               list-none p-10 '>

                 {movies.map(movie  => (
                 
                   <li  className=""
                        key={movie.credit_id}>

                       {movie.poster_path ? (
                       <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                            alt={movie.title}
                            className='w-full aspect-[2/3] rounded-sm object-cover 
                                         mx-auto mb-4'  />

                  ) : (

                    <div className='bg-[#ccc] text-gray-700 w-full 
                                    aspect-[2/3] text-sm
                                  flex items-center justify-center 
                                  rounded-sm p-1 mx-auto mb-4'>
                                    No photo
                    </div>

                )}
                    <div className='flex flex-col items-center'>
                     <Link 
                          to={`/movies/${movie.id}`}
                          state={{ from: location }}
                          className={`text-base md:text-lg xl:text-xl 
                                   font-semibold text-center
                                   ${isDark ? "bg-bg-dark text-text-dark" 
                                            : "bg-bg-light text-text-light"}
                                   `}>
                      {movie.title}</Link>

                     {movie.character && (
                      <p className={`font-normal text-center
                       ${isDark ? "bg-bg-dark text-text-dark" 
                                : "bg-bg-light text-text-light"}
                      `}>
                        as {movie.character}
                      </p>
     )}
                      </div>

                 </li>)

                  )}
                </ul>

              )} 

           </div>
           
         </div>
       
    );
    };

export default PersonMoviesModal;