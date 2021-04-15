import AlertStatus from './alerts.jsx';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../general/navbar.jsx'


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
            setNoPostCode("No hay coincidencias")
            setPostCode('')

            setTimeout(() => {
                setNoPostCode()
            }, 2000)
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
        <div>
            <NavBar />
            <div className='encontrados'>
                {wellDone && <p className='alert alert-secondary seeAll'>{wellDone}</p>}
                <div>
                    <form className='loginForm cpFilter'>
                        <input className='form-control inputCpFilter' name='cp' type="number" placeholder='Código Postal' value={postCode} onChange={handleChangeInput}/>
                        <button className='btn btn-light buttonCpFilter' type='submit' onClick={filter}>Filtrar</button>
                        <div>
                        {noPostCode && <p className='alert alert-danger noPostCode'>{noPostCode}</p>}
                        </div>
                    </form>
                    <button className='btn btn-secondary deleteCpFilter' type='reset' onClick={deleteFilter}>Quitar filtro</button>
                </div>
            <AlertStatus animales={animalsFiltered}/>
            </div>
        </div>
    )
}

export default AlertFound;