// import { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';

// import { getMovieCredits } from '../services/tmdbAPI';

// const MovieCast = () => {
//   const { movieId } = useParams();
//   const [cast, setCast] = useState([]);

//   useEffect(() => {

//     getMovieCredits(movieId)
//       .then(({ data }) => setCast(data.cast))
//       .catch(error => console.error('Error fetching movie cast:', error));
//   }, [movieId]);

//   if (cast.length === 0) {
//     return <p>No cast information available.</p>;
//   }

//   return (

//        <ul className='flex flex-row justify-center items-center w-full 
//                     p-10 list-none  flex-wrap gap-3 '>
//         {cast.map(({ id, name, character, profile_path }) => (
//             <li className='w-50 block text-center ' key={id}>
//                {profile_path ? (
//                   <img
//                     src={`https://image.tmdb.org/t/p/w200${profile_path}`}
//                     alt={name}
//                     className='rounded-sm object-cover text-center mx-auto'
//                     // width="100"
//                   />
//                 ) : (
//                   <div className='bg-[#ccc] text-[#444] text-sm
//                                   flex items-center justify-center 
//                                   rounded-sm p-1 mx-auto '>
//                                     No photo</div>
//                 )}
//                 <p className='text-base font-semibold'><strong>{name}</strong></p>
//                 <p className= 'font-medium'>as {character}</p>
//     </li>
//   ))}
// </ul>

//   );
// };

// export default MovieCast;
