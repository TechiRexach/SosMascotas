import InfoConsejos from './InfoConsejos.jsx';
import InfoLinks from './InfoLinks.jsx';
import NavBar from '../general/Navbar.jsx'

function Info(){
    return(
        <div className='infoPage'>
            <NavBar />
            <InfoConsejos />
            <InfoLinks />
        </div>
    );
};

export default Info;
