import './navbar.css';
import { Link } from 'react-router-dom';
import Logo from './logoMovil.png';

function NavBar(){

    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <Link to={'/'} className="navbar-brand">
                    <img className='logoNavbar' src={Logo} alt="Logo"/>
                    </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <Link to={'/perdidos'} className="nav-link">Perdidos</Link>
                        <Link to={'/encontrados'} className="nav-link">Encontrados</Link>
                        <Link to={'/encasa'} className="nav-link">En casa</Link>
                        <Link to={'/info'} className="nav-link">Información</Link>
                        <Link to={'/myprofile'} className="nav-link">Acceso / Mi perfil</Link>
                        <Link to={'/contacto'} className="nav-link disabled" tabIndex="-1" aria-disabled="true">Contacto</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;