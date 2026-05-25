const TitleSearchForm = ({
  titleValue,
  setTitleValue,
  handleTitleSubmit,
  handleTitleClear,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-bold pl-2 text-base md:text-lg xl:text-2xl">
        Title
      </p>

      <form
        onSubmit={handleTitleSubmit}
        className="flex flex-col md:flex-row gap-3 items-center pl-2 w-full"
      >
        <input
          value={titleValue}
          onChange={e => setTitleValue(e.target.value)}
          className="h-10 w-full bg-white text-xl border pl-5 rounded"
          type="text"
          name="search"
          placeholder="Enter the movie title..."
        />

        <button
          className="text-base h-10 bg-[#f59e0b] !border w-40 !border-black"
          type="submit"
        >
          Search
        </button>

        <button
          className="text-base h-10 bg-blue-200 !border !border-black w-40"
          type="button"
          onClick={handleTitleClear}
        >
          Clear
        </button>
      </form>
    </div>
  );
};

export default TitleSearchForm;