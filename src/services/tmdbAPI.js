import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const options = {
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_BEARER_TOKEN}`,
  },
};

export const fetchTrendingMovies = () =>
  // axios.get(`${BASE_URL}/trending/movie/day?api_key=${API_KEY}`, options);
  axios.get(`${BASE_URL}/trending/movie/day`, options);

export const searchMovies = query =>
  //axios.get(`${BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}`);
  axios.get(`${BASE_URL}/search/movie?query=${query}`, options);

export const getMovieDetails = id =>
  // axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`, options);
  axios.get(`${BASE_URL}/movie/${id}`, options);

export const getMovieCredits = id =>
  // axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}`, options);
  axios.get(`${BASE_URL}/movie/${id}/credits`, options);
export const getMovieReviews = id =>
  //axios.get(`${BASE_URL}/movie/${id}/reviews?api_key=${API_KEY}`, options);
  axios.get(`${BASE_URL}/movie/${id}/reviews`, options);
