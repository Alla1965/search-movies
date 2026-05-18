import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navigation from './components/Navigation/Navigation';

import MovieCast from "./components/MovieCast/MovieCast"
// import MovieReview from "./components/MovieReviews/MovieReviews.jsx"
import MovieReviews from './components/MovieReviews/MovieReviews';

const HomePage = lazy(() => import('./pages/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage/MovieDetailsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));
// import NotFoundPage from './pages/NotFoundPage/NotFoundPage';

const App = () => (
  <>
    <Navigation />
    <Suspense fallback={<p>Loading...</p>}>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} /> 
        <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} >
         <Route path="cast" element={<MovieCast />} />
          <Route path="reviews" element={<MovieReviews />} />
            <Route path="*" element={<NotFoundPage />} />  
        </Route>

       <Route path="*" element={<NotFoundPage />} />  
      </Routes>
    </Suspense>
  </>
);

export default App;


