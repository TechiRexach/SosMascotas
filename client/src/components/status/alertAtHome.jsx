import AlertStatus from './alerts.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';


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
        <div className='encasa'>
        {wellDone && <h3>{wellDone}</h3>}
        <AlertStatus animales={animales}/>
        </div>
    )
}

export default AlertAtHome;