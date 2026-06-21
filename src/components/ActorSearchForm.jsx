const ActorcSearchForm = ({
  actorValue,
  setActorValue,
  handleActorSubmit,
  handleActorClear,
  isDark,
  t
}) => {
      
  return (
    <div className="flex flex-col gap-4">
        <p className="font-bold pl-2 text-base md:text-lg xl:text-2xl">
         {t.actor}
        </p>

      <form
         onSubmit={handleActorSubmit}
         className="flex flex-col md:flex-row gap-3 items-center pl-2 w-full"  >

        <input
            value={actorValue}
            onChange={e => setActorValue(e.target.value)}
            className={`h-10 w-full text-xl border pl-5 rounded
                      ${isDark ? "bg-muted-dark border-white/10" 
                      : "bg-card-light border-border-light"}
                                       `}
            type="text"
            name="search"
            placeholder={t.enterActor}
         />
        
        {/* button SEARCH */}
        <button
          className="text-base h-10 bg-[#f59e0b] !border w-40 !border-black"
          type="submit"  >
         {t.search} 
        </button>

        {/* button CLEAR */}
        <button
          className="text-base h-10 bg-blue-200 !border !border-black w-40"
          type="button"
          onClick={handleActorClear}
        >
          {t.clear} 
        </button>

      </form>
    </div>
  );
};

export default ActorcSearchForm;