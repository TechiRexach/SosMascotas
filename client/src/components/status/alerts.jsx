import './status.css';
import { Link } from 'react-router-dom';

function AlertsStatus(props){

    return(
        <div className='alertStatus'>
            
        {props.animales.map(animal => (
            <Link key={animal._id} to={`/veranimal/${animal._id}`}>
            <div className='oneAlertStatus'>
                <div className='fotoAlertStatus'>
                    <img src={`http://localhost:5000/storage/${animal.photo}`} alt="Foto" />
                </div>
                <div className='infoAlertStatus'>
                    <div className='alertDate'>
                        <div className='textAlertStatus'>Fecha</div>
                        <div>{animal.fechaUsuario}</div>
                    </div>
                    <div className='alertInfo'>
                        <div className='textAlertStatus'>Especie</div>
                        <div>{animal.species}</div>
                    </div>
                </div>
            </div>
            </Link>
            ))}
        </div>
    );
};

export default AlertsStatus;