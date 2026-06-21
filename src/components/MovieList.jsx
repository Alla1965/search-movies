import { Link, useLocation } from 'react-router-dom';
import SortIcon from "./icons/SortIcon"  
import FlameIcon from "./icons/FlameIcon"  
import StarIcon from '../components/icons/StarIcon';

const MovieList = ({ movies= [],
                      totalResults,
                      totalPages,
                      currentPage, 
                      onSeeMore, 
                      sortBy,
                      onSortChange, 
                      isDark,
                      t
                   }) => {

const location = useLocation();

  return (
    <div className={`min-h-screen w-full ${isDark ? "bg-bg-dark text-text-dark" 
                  : "bg-bg-light text-text-light"}`}>
    
    
    {totalResults !== undefined && totalResults > 0 &&(     
       <header className={`flex flex-col md:flex-row items-start md:justify-between mt-10 py-4 px-6 rounded-2xl
                     shadow-[5px_5px_10px_grey]  text-base md:text-lg xl:text-xl font-semibold
                      ${isDark ? "bg-card-dark border border-white/10"
                      : "bg-card-light border border-border-light"}`}>        
                 
        <div className='flex flex-col justify-center min-h-16 gap-4'>
          <p>{t.results}: <span className='font-normal items-center'>{totalResults}</span> </p>
        </div>
        
         <div className='flex gap-3 my-auto'>

            <div className='flex size-10 items-center justify-center rounded-lg bg-orange-300'>
               <SortIcon />
            </div>

            <div className='font-light flex flex-col gap-2'>
                 <p className='font-extrabold'> {t.sortBy} </p>
                 <select 
                   value={sortBy}
                   onChange={event => onSortChange(event.target.value)}
                     className='font-normal'>
              
                    <option value="vote_average.desc"> {t.ratingHigh}</option>
                    <option value="vote_average.asc">{t.ratingLow}</option>
                    <option value="primary_release_date.desc">{t.releaseNew}</option>
                    <option value="primary_release_date.asc">{t.releaseOld}</option>
                 </select>
            </div>

        </div> 

       </header>
    )}

    <ul className='text-base  gap-8 py-8
                   grid justify-center md:grid-cols-4 xl:grid-cols-6'>
      
       {movies.map(({ id, title, poster_path, vote_average, vote_count, release_date, original_title }) => (
         <li className={`relative flex flex-col gap-2 justify-start border rounded-lg p-3 m-0
                     ${isDark ?  "bg-[linear-gradient(180deg,#172b45, var(--color-card-dark))]  border-[rgba(255,255,255,.08)]" 
                      : " bg-card-light "}  `}
             key={id}>
              {(vote_average>7)&&(
                <FlameIcon />
              )}
            
            {poster_path && (
             <Link 
             className='flex flex-col text-xl'
             to={`/movies/${id}`} state={{ from: location }}>
            <img
              loading="lazy"
              width="185"
              height="278"
              className="w-full aspect-[2/3] rounded-lg"
              src={`https://image.tmdb.org/t/p/w185${poster_path}`}
              alt={title}
            />
             </Link>

       )}

      <div className='flex flex-col gap-2 flex-1'>      
          <div className='flex flex-col mb-auto '>

          <Link 
             className='flex flex-col text-xl'
             to={`/movies/${id}`} state={{ from: location }}>
            {title} {release_date && `(${release_date.slice(0, 4)})`}
          </Link>

          {(title !== original_title)&&(
             <p className={`text-base md:text-lg xxl:text-xl
               ${isDark ?  "text-muted-dark" : " text-muted-light "}`}>
              {original_title}</p>
           )}

          </div>

          <div className='flex flex-col gap-2 mt-auto'>
            <div className='flex gap-2'>
              <StarIcon />
           <p className='text-base md:text-lg xxl:text-xl'>{(vote_average * 10).toFixed(0)}% </p>
           </div>
           <p> {vote_count} {t.voices}  </p>
         </div>


      </div>

        </li>
      ))}

    </ul>

    {currentPage < totalPages && (
       <div className='flex justify-center items-center'>
         <button 
           className="text-base md:text-lg xl:text-xl px-8 py-3 
                     bg-[#f59e0b] text-white !rounded-full mb-10"
           type="button" onClick={onSeeMore}>
           {t.seeMore}
         </button>
       </div>
     )}

     </div> 
  );

};

export default MovieList;
 