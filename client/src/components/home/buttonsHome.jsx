import './home.css';
import { Link } from 'react-router-dom';

function HomeButtons () {

    return (
        <div className='alertsHome'>
            <div className='homeButtons'>
                
               <button> <Link to='/registro'> Registrarme </Link> </button>
               
               <button> <Link to='/login'> Iniciar Sesión </Link> </button>
            </div>
        </div>
    );
};
   
   export default HomeButtons;