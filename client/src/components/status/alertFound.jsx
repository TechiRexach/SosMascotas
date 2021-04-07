import AlertStatus from './alerts.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';


function AlertFound(){
    const [animals, setAnimals] = useState([]);
    const [wellDone, setWellDone] = useState('');
    const [postCode, setPostCode] = useState('');
    const [noPostCode, setNoPostCode] = useState('');
    const [animalsFiltered, setAnimalsFiltered] = useState([]);

    //RELLENAR ARRAYS CON TODOS LOS ANIMALES. VAMOS A MODIFICAR SOLO LA "DUPLICADA" => ANIMALSFILTERED
    useEffect(() => {
        axios.get("http://localhost:5000/found")
        .then(allLostAnimals => {
            setAnimals(allLostAnimals.data.pets)
            setWellDone(allLostAnimals.data.message)
            setAnimalsFiltered(allLostAnimals.data.pets)
        })
      }, [])

    //RECOGER VALOR INPUT CP
    const handleChangeInput = (event) => {
        event.preventDefault()
        setPostCode(event.target.value)
    }
   
    //APLICAR FILTRO
    function filter(event){
        event.preventDefault()

        const filterApplied = animals.filter(animal => (animal.cp == postCode))
        if(filterApplied.length === 0){
            setAnimalsFiltered(animals)
            setNoPostCode("NO HAY")
            setPostCode('')

            setTimeout(() => {
                setNoPostCode()
            }, 1000)
        }
        else{
            setAnimalsFiltered(filterApplied)
        }
    }

    //BORRAR FILTRO
    const deleteFilter = (event)=> {
        event.preventDefault()
        setAnimalsFiltered(animals)
        setPostCode('')
    }


    return(
        <div className='encontrados'>
        <div>
            <p className='cpfilterText'>Busca por tu zona:</p>
            <form className='cpFilter'>
                <input className='inputCpFilter' name='cp' type="number" placeholder='Código Postal' value={postCode} onChange={handleChangeInput}/>
                <button className='buttonCpFilter' type='submit' onClick={filter}>Filtrar</button>
            </form>
            <button className='deleteCpFilter' type='reset' onClick={deleteFilter}>Quitar filtro</button>
            {noPostCode && <p className='noPostCode'>{noPostCode}</p>}
        </div>
        {wellDone && <h3>{wellDone}</h3>}
        <AlertStatus animales={animalsFiltered}/>
        </div>
    )
}

export default AlertFound;