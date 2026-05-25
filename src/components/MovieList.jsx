import { Link, useLocation } from 'react-router-dom';

const MovieList = ({ movies,
  totalResults,
  totalPages,
  currentPage, 
  onSeeMore, 
     }) => {
  const location = useLocation();

  return (
    <>
{totalResults !== undefined && (
    <div className="px-8 pb-2 text-base md:text-lg xl:text-xl font-semibold">
  <p>Results: {totalResults}</p>
  <p>Pages: {currentPage} / {totalPages}</p>
</div>
)}

    <ul className='text-base  gap-8 p-8
                   grid justify-center md:grid-cols-2 xl:grid-cols-4'>
      {movies.map(({ id, title, poster_path, vote_average, release_date, original_title }) => (
        <li className='flex flex-col gap-2 justify-start  m-0'  
             key={id}>

{poster_path && (
  <img
    loading="lazy"
    width="185"
    height="278"
    className="w-full h-auto"
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
           <p className='text-base md:text-lg xxl:text-xl'>{(vote_average * 10).toFixed(0)}%</p>
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
 