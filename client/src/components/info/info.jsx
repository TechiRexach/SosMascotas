import InfoConsejos from './infoConsejos.jsx';
import InfoLinks from './infoLinks.jsx';
import NavBar from '../general/navbar.jsx'

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