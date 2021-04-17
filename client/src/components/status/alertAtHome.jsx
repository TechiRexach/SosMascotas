import AlertStatus from './alerts.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../general/navbar.jsx';
import { HEROKU_URL, DEV_URL } from '../constants/constant.jsx'

function AlertAtHome(){
    const [animales, setAnimales] = useState([]);
    const [wellDone, setWellDone] = useState('');

    useEffect(() => {
        axios.get(`${HEROKU_URL}/athome`)
        .then(allHomeAnimals => {

            const animals = allHomeAnimals.data.pets
            const orderedAnimals = animals.sort(function (a, b) {
                return new Date(b.fechaUsuario) - new Date(a.fechaUsuario)
            })
            setAnimales(orderedAnimals)
            setWellDone(allHomeAnimals.data.message)
        })
      }, [])


    return(
        <div className='athomePage'>
            <NavBar />
            <div className='encasa'>
                {wellDone && <p className='alert alert-secondary seeAll'>{wellDone}</p>}
                <AlertStatus animales={animales}/>
            </div>
        </div>
    )
}

export default AlertAtHome;