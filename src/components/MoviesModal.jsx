     import MovieList from '../components/MovieList';
        
        const MoviesModal = ({ movies, 
          location, 
          onClose,
           totalResults,
           totalPages,
           currentPage, 
           onSeeMore,
           sortBy,
           onSortChange,
          isDark,}) => {
                       
    return (
         <div className="fixed inset-0 flex justify-center items-center bg-black/70 p-8"
              onClick={onClose}>
           <div className="bg-white w-full max-h-[80vh]
                           overflow-y-auto border  border-black rounded-2xl"
                onClick={e => e.stopPropagation()}>
             <button className='flex bg-white ml-auto text-4xl py-3 pr-4 '
                    type="button"  
                    onClick={onClose}>
               ˣ
             </button>

             <MovieList 
             movies={movies} 
             location={location} 
             totalResults={totalResults}
             totalPages={totalPages}
             currentPage={currentPage}
             onSeeMore={onSeeMore}
             sortBy={sortBy}
             onSortChange={onSortChange}
             isDark={isDark}
             />
           </div>
           
         </div>
       
    );
};

export default MoviesModal;  

