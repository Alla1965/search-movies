import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const getActiveClass = ({ isActive }) => clsx('flex text-2xl no-underline font-bold text-[#334e68] gap-x-10', 
                         isActive && '!text-[#f59e0b] !underline');

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