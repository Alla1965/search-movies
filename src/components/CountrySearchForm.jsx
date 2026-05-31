const CountrySearchForm = ({
   countryValue,
   setCountryValue,
   handleCountrySubmit,
   handleCountryClear,
   genres,
   genreValue,
   setGenreValue,
   countries
}) => {
  console.log('countryValue:', countryValue);

  return (
  

      <div className='flex flex-col gap-4'>
        

      <form onSubmit={handleCountrySubmit}  
            className='flex flex-col md:flex-row gap-3 items-center pl-2 w-full'>
           
         <div className="flex gap-6 w-full">

            <div className="w-full flex-1"> 

               <p className='font-bold pl-2 text-base md:text-lg xl:text-2xl mb-2'> Country </p>  
               
                     <select  value={countryValue}
                             onChange={e => setCountryValue(e.target.value)}
                             className="h-10 w-full bg-white text-xl border pl-5 rounded"
                         >
                          <option value="">Select country</option>
                         
                            {[...countries]
  .sort((a, b) => a.english_name.localeCompare(b.english_name))
  .map(country => (
    <option key={country.iso_3166_1} value={country.iso_3166_1}>
      {country.english_name}
    </option>
  ))}
                     </select>
   
            </div>  

            <div className='flex-1 w-full bg-white text-xl  pl-5 rounded gap-4'>
               <p className='font-bold pl-2 text-base md:text-lg xl:text-2xl mb-2'>Genre</p>

                 <select
                    value={genreValue}
                    onChange={e => setGenreValue(e.target.value)}
                    className="h-10 w-full bg-white text-xl border pl-5 rounded "
                  >
 
                   <option 
                     value="">Select genre</option>
                       {genres.map(genre => (
                       <option key={genre.id} value={genre.id}>
                       {genre.name}
                    </option>

                   ))}
                </select>

            </div>

         </div>

             <button className='self-end text-base h-10 bg-[#f59e0b]
                          !border w-40 !border-black' 
                     type="submit"> Search
              </button>

              <button className='self-end text-base h-10 bg-blue-200 !border !border-black w-40'
                       type="button" 
                       onClick={handleCountryClear}>
                         Clear
              </button>

      </form>

      </div>
);
};
export default CountrySearchForm;