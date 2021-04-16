import './home.css';
import HomeButtons from './buttonsHome.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from '../general/navbar.jsx'
import moment from 'moment';
import 'moment/locale/es'


function AlertsHome (props) {

    const [animales, setAnimales] = useState([]);
    const [wellDone, setWellDone] = useState('');

    useEffect(() => {
        axios.get("https://sosmascotas.herokuapp.com/animals")
        .then(animales => {
            const animals = animales.data.Animals
            const orderedAnimals = animals.sort(function (a, b) {
                return new Date(b.fechaUsuario) - new Date(a.fechaUsuario)
            })

            setAnimales(orderedAnimals)
            setWellDone(animales.data.message)
        })
    }, [])

    return (
        <div>
            <NavBar />
            <HomeButtons />
        {wellDone && <p className="alert alert-secondary seeAll">{wellDone}</p>}
        <div className='alertsHome'>
            {animales.map(animal => (
                <Link key={animal._id} to={`/veranimal/${animal._id}`}>
                    <div  className='form-control card mb-3 oneAlertHome'>
                        <div className='card-body'>
                            <div className='card-text'>{animal.status}</div>
                            <div className='card-text'>{animal.species}</div>
                            <div className='card-text'>{moment(animal.fechaUsuario).format('L')}</div>
                        </div>
                        <div className='col-md-4 photoAlertHome'>
                            <img src={`https://sosmascotas.herokuapp.com/storage/${animal.photo}`} alt="Foto" />
                        </div>
                    </div>
                </Link>
             ))}
        </div>
        </div>
    );
};

export default AlertsHome;