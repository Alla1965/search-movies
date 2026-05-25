import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const options = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
  },
};
export const getMoviesByCountry = countryCode =>
  axios.get(`${BASE_URL}/discover/movie?with_origin_country=${countryCode}`, options);

// список стран и кодов
export const getCountries = () =>
  axios.get(`${BASE_URL}/configuration/countries`, options);

export const fetchTrendingMovies = () =>
  axios.get(`${BASE_URL}/trending/movie/day`, options);

export const searchMovies = (query, page = 1) =>
  axios.get(`${BASE_URL}/search/movie?query=${query}&page=${page}`, options);

export const getMovieDetails = id =>
   axios.get(`${BASE_URL}/movie/${id}`, options);



export const getMovieCredits = id =>
    axios.get(`${BASE_URL}/movie/${id}/credits`, options);

export const getMovieReviews = id =>
   axios.get(`${BASE_URL}/movie/${id}/reviews`, options);

export const getGenres = () =>
  axios.get(`${BASE_URL}/genre/movie/list`, options);


export const getMoviesByFilters = ({ countryCode, genreId, page = 1 }) => {
  const params = new URLSearchParams();

  if (countryCode) {
    params.append('with_origin_country', countryCode);
  }

  if (genreId) {
    params.append('with_genres', genreId);
  }
  params.append('page', page);

  return axios.get(`${BASE_URL}/discover/movie?${params.toString()}`, options);
};
