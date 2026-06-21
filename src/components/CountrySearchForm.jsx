const CountrySearchForm = ({
   countryValue,
   setCountryValue,
   handleCountrySubmit,
   handleCountryClear,
   genres,
   genreValue,
   setGenreValue,
   countries,
   isDark,
   t,
   language
}) => {
  const currentLanguage = language || "en";
  const countryNames = new Intl.DisplayNames([currentLanguage === "uk" ? "uk" : "en"], {
  type: "region",
});
  return (
  

      <div className='flex flex-col gap-4'>
        

      <form onSubmit={handleCountrySubmit}  
            className='flex flex-col md:flex-row gap-3 justify-start items-center pl-2 w-full'>
           
         <div className="flex flex-col md:flex-row gap-6 w-full">

            <div className="w-full flex-1"> 

               <p className='font-bold pl-2 text-base md:text-lg xl:text-2xl mb-2'> {t.country} </p>  
               
               <select  value={countryValue}
                             onChange={e => setCountryValue(e.target.value)}
                             className={`h-10 w-full text-xl border pl-5 rounded
                               ${isDark ? "bg-muted-dark border-white/10" 
                                : "bg-card-light border-border-light"}
                                       `}
                         >
                          <option value="">{t.selectCountry}</option>
                         
                            {[...countries]
                              .sort((a, b) =>
                                countryNames
                                  .of(a.iso_3166_1)
                                  .localeCompare(countryNames.of(b.iso_3166_1), currentLanguage)
                              )
                              .map(country => (
                             <option key={country.iso_3166_1} value={country.iso_3166_1}>
                               {countryNames.of(country.iso_3166_1)}
                             </option>
                           ))}
                            
                             
                </select>
   
            </div>  

            <div className='w-full flex-1'>
               <p className='font-bold pl-2 text-base md:text-lg xl:text-2xl mb-2'>{t.genre}</p>

                 <select
                    value={genreValue}
                    onChange={e => setGenreValue(e.target.value)}
                    className={`h-10 w-full text-xl border pl-5 rounded
                               ${isDark ? "bg-muted-dark border-white/10" 
                                : "bg-card-light border-border-light"}
                                       `}
                  >
 
                   <option 
                     value="">{t.selectGenre}</option>

                       {genres.map(genre => (
                       <option key={genre.id} value={genre.id}>
                       {genre.name}
                    </option>

                   ))}
                </select>

            </div>

         </div>

             <button className='md:self-end text-base h-10 bg-[#f59e0b]
                          !border w-40 !border-black' 
                     type="submit"> {t.search}
              </button>

              <button className='md:self-end text-base h-10 bg-blue-200 !border !border-black w-40'
                       type="button" 
                       onClick={handleCountryClear}>
                        {t.clear}
              </button>

      </form>

      </div>
);
};
export default CountrySearchForm;