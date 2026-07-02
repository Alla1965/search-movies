import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const options = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
  },
};

//Запрос популярных фильмов
export const fetchTrendingMovies = () =>
  axios.get(`${BASE_URL}/trending/movie/day`, options);

// export const getMoviesByCountry = countryCode =>
//   axios.get(`${BASE_URL}/discover/movie?with_origin_country=${countryCode}`, options);

// список стран и кодов
export const getCountries = () =>
  axios.get(`${BASE_URL}/configuration/countries`, options);

//поиск фильма по названию 
export const searchMovies = (query, page = 1) =>
  axios.get(`${BASE_URL}/search/movie?query=${query}&page=${page}`, options);

//поиск актера по имени
export const searchActors = (actor, page = 1) =>
  axios.get(`${BASE_URL}/search/person?query=${encodeURIComponent(actor)}&page=${page}`, options);

//запрос деталей фильма по Id с выбром языка
export const getMovieDetails = (movieId, language = "en") => {
  const apiLanguage = language === "uk" ? "uk-UA" : "en-US";

  return axios.get(
    `${BASE_URL}/movie/${movieId}?language=${apiLanguage}`,
    options
  );
};
//запрос деталей по актеру по Id с выбром языка
export const getPersonDetails  = (personId, language = "en") => {
    const apiLanguage = language === "uk" ? "uk-UA" : "en-US";
    return axios.get(
  `${BASE_URL}/person/${personId}?language=${apiLanguage}`,
  options
);
};

//запрос списка актеров по Id фильма 
export const getMovieCredits = id =>
    axios.get(`${BASE_URL}/movie/${id}/credits`, options);

//запрос отзывов по Id фильма 
export const getMovieReviews = id =>
   axios.get(`${BASE_URL}/movie/${id}/reviews`, options);

// Запрос списка жанров
export const getGenres = (language = "en") =>{
   const apiLanguage = language === "uk" ? "uk-UA" : "en-US";
return  axios.get(`${BASE_URL}/genre/movie/list?language=${apiLanguage}`, options);};

// Запрос по выбраной стане и жанру с сортировкой рейтинга по убыванию

export const getMoviesByFilters = ({ countryCode,   sortBy = 'vote_average.desc', genreId, page = 1 }) => {
  const params = new URLSearchParams();

  if (countryCode) {
    params.append('with_origin_country', countryCode);
  }

  if (genreId) {
    params.append('with_genres', genreId);
  }
     params.append('sort_by', sortBy);
     params.append('page', page);

  return axios.get(`${BASE_URL}/discover/movie?${params.toString()}`, options);
};

// Запрос актеров
export const getPersonMovieCredits = personId =>
  axios.get(`${BASE_URL}/person/${personId}/movie_credits`, options);


