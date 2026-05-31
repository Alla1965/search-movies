import { Link, useLocation } from 'react-router-dom';


const MovieList = ({ movies,
  totalResults,
  totalPages,
  currentPage, 
  onSeeMore, 
  sortBy,
  onSortChange,
     }) => {
  const location = useLocation();
 
  return (
    <>
    {totalResults !== undefined && (

     <div className="flex items-center justify-between mx-10 p-10 bg-[#FCF8F6] rounded-2xl
                     shadow-[5px_5px_10px_grey]  text-base md:text-lg xl:text-xl font-semibold">
        <div className='flex flex-col gap-4'>
         <p>Results: <span className='font-normal'>{totalResults}</span> </p>
         <p>Pages: <span className='font-normal'>{currentPage} / {totalPages}</span></p>
        </div>
         
         <div className=''>
         <p>Sort by </p>
         <select 
       value={sortBy}
       onChange={event => onSortChange(event.target.value)}
             className='font-normal'>
            <option value="vote_average.desc">Rating: high to low</option>
            <option value="vote_average.asc">Rating: low to high</option>
            <option value="primary_release_date.desc">Release date: newest first</option>
            <option value="primary_release_date.asc">Release date: oldest first</option>
         </select>

        </div> 

     </div>
     )}

    <ul className='text-base  gap-8 p-8
                   grid justify-center md:grid-cols-4 xl:grid-cols-6'>
      
      {movies.map(({ id, title, poster_path, vote_average, vote_count, release_date, original_title }) => (
        <li className='flex flex-col gap-2 justify-start  m-0'  
             key={id}>

            {poster_path && (
            <img
              loading="lazy"
              width="185"
              height="278"
              className="w-full aspect-[2/3]"
              src={`https://image.tmdb.org/t/p/w185${poster_path}`}
              alt={title}
            />
       )}

          <Link 
             className='text-black text-xl'
             to={`/movies/${id}`} state={{ from: location }}>
            {original_title} {release_date && `(${release_date.slice(0, 4)})`}
          </Link>

           <p className='text-base md:text-lg xxl:text-xl'>{title}</p>
           <p className='text-base md:text-lg xxl:text-xl'>{(vote_average * 10).toFixed(0)}%, Total voices: {vote_count}</p>

        </li>
      ))}
    </ul>

{currentPage < totalPages && (
<div className='flex justify-center items-center'>
  <button 
     className="text-base md:text-lg xl:text-xl px-8 py-3 
              bg-[#f59e0b] text-white !rounded-full mb-10"
     type="button" onClick={onSeeMore}>
    See more 
  </button>
  </div>
)}

   </> 
  );
};

export default MovieList;
 