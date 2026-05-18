// import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage = ({ message = '' }) => {
   
  return (
    <div className={css.container}>
      <p>{message}</p>
     
    </div>
  );
};

export default NotFoundPage;
