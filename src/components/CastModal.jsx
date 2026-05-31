import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getMovieCredits, getMovieDetails } from '../services/tmdbAPI';
import { Link } from 'react-router-dom';

const CastModal = () => {

   const { movieId } = useParams();
   console.log(movieId);
   const [movie, setMovie] = useState(null);
   const [cast, setCast] = useState([]);
   const navigate = useNavigate();
   const [isLoading, setIsLoading] = useState(false);

      useEffect(() => {
  setIsLoading(true);

  Promise.all([
    getMovieCredits(movieId),
    getMovieDetails(movieId),
  ])
    .then(([creditsResponse, movieResponse]) => {
      setCast(creditsResponse.data.cast);
      setMovie(movieResponse.data);
    })
    .catch(error => {
      console.error('Error loading movie data:', error.message);
    })
    .finally(() => {
      setIsLoading(false);
    });
}, [movieId]);

      if (isLoading) {
        return <p>Loading...</p>;   }

      if (cast.length === 0) {
      return <p>No cast information available.</p>;}
                
     return (
         <div className="fixed inset-0 flex justify-center items-center bg-black/70 p-8"
              onClick={() => navigate(-1)}>

            <div className="bg-white w-full max-h-[80vh]
                           overflow-y-auto border  border-black rounded-2xl"
                onClick={e => e.stopPropagation()}>

              {/* Block: Title+button close      */}
              <div className='relative w-full  px-10 py-6'>
              <div className='flex flex-col items-center justify-center gap-2'>
                <h2 className="text-xl md:text-2xl xl:text-3xl font-semibold text-center">
                    Actors who starred in the film
                </h2>
                 <div className='text-lg md:text-xl xl:text-2xl font-normal text-center text-[#646cff]'>
                        {movie?.title}
                        </div> 
              </div>

              {/* Button CLOSE       */}
             <button className='close-button absolute right-4 top-4  bg-white text-4xl py-3 pr-4 focus:outline-none hover:outline-none hover:border-transparent focus:ring-0'
                    type="button"  
                     style={{
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
  }}
                    onClick={() => navigate(-1)}>
               ˣ
             </button>
              </div>

               {isLoading && <p>Loading...</p>}

              {!isLoading && cast.length === 0 && (
              <p>No cast information available.</p>
               )}

               {!isLoading && cast.length > 0 && (
                <ul className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-6 w-full 
                               list-none p-10 '>
                 {cast.map(actor => (
                 <li 
                    className='w-50 block mx-auto'
                    key={actor.id}>
                       {actor.profile_path ? (
                       <img src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
                            alt={actor.name}
                            className='w-full aspect-[2/3] rounded-sm object-cover 
                                         mx-auto mb-4'  />

                  ) : (
                    <div className='bg-[#ccc] text-[#44] w-full aspect-[2/3] text-sm
                                  flex items-center justify-center 
                                  rounded-sm p-1 mx-auto mb-4'>
                                    No photo</div>
                )}

                     <Link 
                          to={`/person/${actor.id}/movies`}
                         className='text-base md:text-lg xl:text-xl font-semibold text-center'>{actor.name}</Link>

                         {actor.character && (
                     <p className= 'font-normal'>as {actor.character}</p>
                      )}
                 </li>
                  ))}
                </ul>
              )}  
           </div>
           
         </div>
       
    );
  
};

export default CastModal;
