import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navigation from './components/Navigation';

// import MovieCast from "./components/MovieCast"
 import MovieReviews from './components/MovieReviews';

import CastModal from "./components/CastModal"
import ReviewsModal from './components/ReviewsModal';
import PersonMoviesModal from './components/PersonMoviesModal';

const HomePage = lazy(() => import('./pages/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));


const App = () => (
  <>
    <Navigation />
    <Suspense fallback={<p>Loading...</p>}>
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} /> 
        <Route path="/movies/:movieId/*" element={<MovieDetailsPage />} >

           {/* <Route path="cast" element={<MovieCast />} /> */}
           <Route path="reviews" element={<MovieReviews />} />

           <Route path="cast" element={<CastModal />} />
           {/* <Route path="reviews" element={<ReviewsModal  />} /> */}
           <Route path="*" element={<NotFoundPage />} />  
        </Route>
        <Route path="/person/:personId/movies" element={<PersonMoviesModal />} />
       <Route path="*" element={<NotFoundPage />} />  
      </Routes>
    </Suspense>
  </>
);

export default App;


