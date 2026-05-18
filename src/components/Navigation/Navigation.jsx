// Navigation.jsx
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css'; 

const getActiveClass = ({ isActive }) => clsx(css.link, isActive && css.active);

const Navigation = () => {
  return (
    <nav className={css.nav}>
      <NavLink to="/" className={getActiveClass}>Home</NavLink>
      <NavLink to="/movies" className={getActiveClass}>Movies</NavLink>
    </nav>
  );
};

export default Navigation;