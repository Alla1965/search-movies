import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css'; 

const getActiveClass = ({ isActive }) => clsx(css.link, isActive && css.active);

const Navigation = () => {
  return (
    <nav className=' flex mb-6 gap-5 mx-10 p-10 bg-[#FCF8F6] rounded-2xl
                     shadow-[5px_5px_10px_grey]'>
      <NavLink to="/" className={getActiveClass}>Home</NavLink>
      <NavLink to="/movies" className={getActiveClass}>Movies</NavLink>
    </nav>
  );
};

export default Navigation;