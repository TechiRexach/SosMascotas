import './status.css';
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es'

function AlertsStatus(props){

    return(
        <div className='alertStatus'>
        {props.animales.map(animal => (
            <Link key={animal._id} to={`/veranimal/${animal._id}`}>
            <div className='card oneAlertStatus'>
                <div className='fotoAlertStatus'>
                    <img src={animal.photo} alt="Foto" />
                </div>
                <div className='infoAlertStatus'>
                    <div className='card-text'>
                        <div className='textAlertStatus'>Fecha</div>
                        <div>{moment(animal.fechaUsuario).format('L')}</div>
                    </div>
                    <div className='card-text'>
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
