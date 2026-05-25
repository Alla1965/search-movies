const CountrySearchForm = ({
   countrySearch,
   setCountrySearch,
   filteredCountries,
   isCountryListOpen,
   setIsCountryListOpen,
   handleCountrySubmit,
   handleCountryClear,
   genres,
   genreValue,
   setGenreValue,
}) => {return (
      <div className='flex flex-col gap-4'>
        <p className='font-bold pl-2 text-base md:text-lg xl:text-2xl'> Country </p>

      <form onSubmit={handleCountrySubmit}  
            className='flex flex-col md:flex-row gap-3 items-center pl-2 w-full'>
                 
         <div className="relative w-full">   

          <input
            value={countrySearch}
            onChange={e => {
                   setCountrySearch(e.target.value);
                   setIsCountryListOpen(true); }}
            placeholder="Start typing country..."
            className='h-10 w-full bg-white text-xl border pl-5 rounded'
          />

          {isCountryListOpen &&countrySearch && filteredCountries.length > 0 && (
            <ul className="absolute left-0 top-full z-20 mt-1 max-h-60 w-full overflow-y-auto rounded border border-gray-300 bg-white shadow-lg">
                {filteredCountries.map(country => (
                 <li
                 key={country.iso_3166_1}
                 className="cursor-pointer px-4 py-2 hover:bg-blue-100"
                 onClick={() => {
                    setCountrySearch(country.english_name);
                    setIsCountryListOpen(false);}} >
                     {country.english_name}
                 </li>
        ))}
           </ul>
          )}

         </div>  
          <select
  value={genreValue}
  onChange={e => setGenreValue(e.target.value)}
  className="h-10 w-full bg-white text-xl border pl-5 rounded"
>
  <option value="">Select genre</option>

  {genres.map(genre => (
    <option key={genre.id} value={genre.id}>
      {genre.name}
    </option>
  ))}
</select>

        <button className='text-base h-10 bg-[#f59e0b]
                          !border w-40 !border-black' 
                type="submit"> Search
        </button>

        <button 
           className='text-base h-10 bg-blue-200 !border !border-black w-40'
           type="button" 
           onClick={handleCountryClear}>
             Clear
        </button>

      </form>

      </div>
);
};
export default CountrySearchForm;