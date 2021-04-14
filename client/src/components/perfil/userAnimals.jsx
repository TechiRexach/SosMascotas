import './user.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AUTH_TOKEN } from '../constants/constant.jsx'
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es'

function UserAnimals(props){
  
    const [animals, setAnimals] = useState([]);
    const [noAnimals, setNoAnimals] = useState('');
    const [wellDone, setWellDone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem(AUTH_TOKEN)
        const config = {headers: {Authorization: `Bearer ${token}`}}
        axios.get(`http://localhost:5000/animals/myanimals/${props}`, config) 
        .then(response => {
            setAnimals(response.data.animals)
            if(response.data.animals.length === 0){
                setNoAnimals("¡Aun no has creado ningún aviso!")
            }
        })
        .catch((err) => {
            setErrorMessage(err.response.data)
        })
    }, [props])

    const deleteAnimal = (event) => {
        event.preventDefault();
        const animalId ={
            id: event.target.value
        }
        
        const token = localStorage.getItem(AUTH_TOKEN)
        const config = {headers: {Authorization: `Bearer ${token}`}}

        axios.delete(`http://localhost:5000/animal/${animalId.id}`, config)
        .then(response => {
            setWellDone(response.data.message)
            setAnimals(response.data.animals)
            if(response.data.animals.length === 0){
                setNoAnimals("¡Aun no has creado ningún aviso!")
            }
            
            setTimeout(() => {
                setWellDone()
            }, 1500)
        })
        .catch(err => {
            setErrorMessage(err.response.data)
        })
    }


    return(
        <div className='form-control userAnimals'>
            <p>ANIMALES</p>
            {noAnimals && <p className='alert alert-warning'>{noAnimals}</p>}
            <div className='userAnimalsDesktop'>
            {animals.map(animal => (
            <div key={animal._id} className='form-control oneUserAnimal'>
                <div className='animalUserInfo'>
                    <div className='animalUserPhoto'>
                        <img src={`http://localhost:5000/storage/${animal.photo}`} alt="Foto" className='photoAlertView'/>
                    </div>
                    <div className='animalUserText'>
                        <div>
                            <p>Fecha</p>
                            <div>{moment(animal.fechaUsuario).format('L')}</div>
                        </div>
                        <div>
                            <p>Especie</p>
                            <div>{animal.species}</div>
                        </div>
                    </div>
                </div>
                <div className='animalUserButtons'>
                    <button className='alert alert-success updateAnimalUserButton' type='submit' value={animal._id}><Link to={`/updateanimal/${animal._id}`}>Actualizar</Link> </button>
                    <button className='alert alert-danger deleteAnimalUserButton' type='submit' value={animal._id} onClick={deleteAnimal}>Borrar</button>
                </div>
            </div>
            ))} 
            </div>
            {errorMessage && <p className='alert alert-danger noAuth'>{errorMessage}</p>}
            {wellDone && <p className='alert alert-success'>{wellDone}</p>}
        </div>
    );
};

export default UserAnimals;

