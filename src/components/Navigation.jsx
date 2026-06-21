import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

  import MovieHubIcon from "./icons/MovieHubIcon"
  import MoonIcon from "./icons/MoonIcon"      
  import HomeIcon from "./icons/HomeIcon"  
    import MovieIcon from "./icons/MovieIcon"  
    import CastIcon from "./icons/CastIcon"  

const Navigation = ({ isDark, setIsDark, language, setLanguage, t }) => {
const getActiveClass = ({ isActive }) => 
      clsx('flex justify-center items-center text-lg md:text-2xl no-underline text-muted-light font-bold gap-x-2', 
                          isActive && '!text-accent-light underline');
  
  return (
    <nav className={`mx-4 md:mx-6 rounded-xl px-6 py-4 flex items-center justify-between shadow-lg
                    
                     ${isDark ? "bg-card-dark border border-white/10"
                      : "bg-card-light border border-border-light"}`}>

          <div className='w-full flex flex-col  
                          justify-end items-start  gap-5'>

        {/* logo MovieHub + button dark/light + select en/uk*/}
         <div className='w-full flex flex-col-reverse md:flex-row 
                        md:justify-between font-bold gap-5'>
           <div className='flex items-center gap-2 shrink-0'>
                       
             <MovieHubIcon />

            <p className=' text-[24px] font-bold leading-none'>Movie<span className='text-accent-light'>Hub</span></p>
           </div>
           
           <div className='flex  gap-5'>

             <select className={`italic font-medium px-3 py-2 border rounded-md
                                 focus:outline-none 
                                 ${isDark ? "bg-card-dark text-text-dark border-gray-600" 
                                  : "bg-card-light text-text-light border-gray-300"}`} 

                      value={language} 
                      onChange={e => setLanguage(e.target.value)}>
                <option   value="en">EN</option>
                <option   value="uk">UA</option>
             </select>

             <button className='flex gap-2 text-xs font-semibold items-center
                            xxl:text-base leading-loose '
                  onClick={() => setIsDark(!isDark)}>
                
                <MoonIcon />
             </button>

            </div>
            
         </div>

         <div className='flex flex-col items-start md:flex-row md:items-end gap-5'>

           <NavLink to="/" className={getActiveClass}>
            <HomeIcon />  {t.home}
           </NavLink>

           <NavLink to="/movies" className={getActiveClass}>
              <MovieIcon />{t.movie}
           </NavLink>

           <NavLink to="/actors" className={getActiveClass}>
            <CastIcon />  {t.cast}
           </NavLink>

         </div>

         </div>
         
         </nav>
  );
};

export default Navigation;