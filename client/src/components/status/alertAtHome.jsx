import AlertStatus from './alerts.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../general/navbar.jsx'


function AlertAtHome(){
    const [animales, setAnimales] = useState([]);
    const [wellDone, setWellDone] = useState('');

    useEffect(() => {
        axios.get("http://localhost:5000/athome")
        .then(animales => {
            setAnimales(animales.data.pets)
            setWellDone(animales.data.message)
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