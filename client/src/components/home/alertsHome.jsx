import './home.css';
import HomeButtons from './buttonsHome.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


function AlertsHome (props) {

    const [animales, setAnimales] = useState([]);
    const [wellDone, setWellDone] = useState('');
    console.log(animales)

    useEffect(() => {
        axios.get("http://localhost:5000/animals")
        .then(animales => {
          setAnimales(animales.data.Animals)
          setWellDone(animales.data.message)
        })
      }, [])

    return (
        <div><HomeButtons />
        {wellDone && <h3>{wellDone}</h3>}
        <div className='alertsHome'>
        {animales.map(animal => (
            <Link key={animal._id} to={`/veranimal/${animal._id}`}>
                <div  className='oneAlertHome'>
                    <div className='textAlertHome'>
                        <div className='textHomeCard'>{animal.status}</div>
                        <div className='textHomeCard'>{animal.species}</div>
                        <div className='textHomeCard'>{animal.fechaUsuario}</div>
                    </div>
                    <div className='photoAlertHome'>
                        <img src={`http://localhost:5000/storage/${animal.photo}`} alt="Foto" />
                    </div>
                </div>
                </Link>
             ))}
        </div>
        </div>
    );
};

export default AlertsHome;