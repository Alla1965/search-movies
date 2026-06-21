import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense, useEffect, useState } from 'react';
import Navigation from './components/Navigation';
import { translations } from "./i18n/translations"; 

const HomePage = lazy(() => import('./pages/HomePage'));
const MoviesPage = lazy(() => import('./pages/MoviesPage'));
const CastSearchPage = lazy(() => import('./pages/CastSearchPage'));
const MovieDetailsPage = lazy(() => import('./pages/MovieDetailsPage'));
const ActorDetailsPage = lazy(() => import('./pages/ActorDetailsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const MovieReviews = lazy(() => import('./components/MovieReviews'));
const CastModal = lazy(() => import('./components/CastModal'));
const PersonMoviesModal = lazy(() => import('./components/PersonMoviesModal'));
 
const App = () => {
    
  const [isDark, setIsDark] = useState(() => {

  const savedTheme = localStorage.getItem('theme');
  return savedTheme === 'dark';
    });

    const [language, setLanguage] = useState("en");
   const t = translations[language] || translations.en;
   
      useEffect(() => {
         localStorage.setItem('theme', isDark ? 'dark' : 'light');
                      }, [isDark]);

  return(
  
  <div className={`min-h-screen w-full  px-4 py-6
             ${isDark ? " bg-bg-dark text-text-dark"
                      : " bg-bg-light text-text-light "}`}>
    <Navigation 
       isDark={isDark} 
       setIsDark={setIsDark} 
       language={language}
       setLanguage={setLanguage}
       t={t}
       />
    <Suspense fallback={<p>Loading...</p>}>
      
      <Routes>
        <Route path="/" 
              element={<HomePage 
              isDark={isDark} 
              t={t}
        />} 
        />

        <Route path="/movies" 
               element={<MoviesPage 
               isDark={isDark} 
               t={t} 
               language={language} />}
          /> 

          <Route path="/actors" 
                element={<CastSearchPage isDark={isDark} t={t} 
                          language={language} />} />

        <Route path="/actor/:actorId/*" element={<ActorDetailsPage isDark={isDark} t={t} language={language} />} >
             <Route path="movies" element={<PersonMoviesModal isDark={isDark} t={t} />} />
        </Route>

        <Route path="/movies/:movieId/*" element={<MovieDetailsPage isDark={isDark} t={t} language={language} />} >
           <Route path="reviews" element={<MovieReviews isDark={isDark} />} />
           <Route path="cast" element={<CastModal isDark={isDark}  t={t} language={language}/>} />
           <Route path="*" element={<NotFoundPage />} />  
        </Route>
        {/* <Route path="/person/:personId/movies" element={<PersonMoviesModal isDark={isDark} />} /> */}

        
       <Route path="*" element={<NotFoundPage />} />  
      </Routes>

    </Suspense>
    </div>
  
  );
};

export default App;


