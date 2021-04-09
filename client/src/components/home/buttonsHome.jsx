import './home.css';
import { Link } from 'react-router-dom';

function HomeButtons () {

    return (
        <div>
            <div className='homeButtons'>
               <button type='button' className="btn btn-light"> <Link to='/registro'> Registrarme </Link> </button>
               <button type='button' className="btn btn-light"> <Link to='/login'> Iniciar Sesión </Link> </button>
            </div>
         </div> 
    );
};
   
   export default HomeButtons;