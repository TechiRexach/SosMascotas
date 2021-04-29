import './user.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AUTH_TOKEN, HEROKU_URL, DEV_URL } from '../constants/constant.jsx'
import { Link } from 'react-router-dom';
import moment from 'moment';
import 'moment/locale/es';
import Modal from 'react-modal';

function UserAnimals(props){
   
    const userId = props.props
   
    const [animals, setAnimals] = useState([]);
    const [noAnimals, setNoAnimals] = useState('');
    const [wellDone, setWellDone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [id, setID] = useState('');

    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal(id){
        setIsOpen(true)
        setID(id)
    }
    function closeModal(){
        setIsOpen(false)
    }

    useEffect(() => {
        const token = localStorage.getItem(AUTH_TOKEN)
        const config = {headers: {Authorization: `Bearer ${token}`}}
        axios.get(`${HEROKU_URL}/animals/myanimals/${userId}`, config) 
        .then(response => {
            const allAnimals = response.data.animals
            const orderedAnimals = allAnimals.sort(function (a, b) {
                return new Date(b.fechaUsuario) - new Date(a.fechaUsuario)
            })

            setAnimals(orderedAnimals)
            if(response.data.animals.length === 0){
                setNoAnimals("¡Aun no has creado ningún aviso!")
            }
        })
        .catch((err) => {
            setErrorMessage(err.response.data)
        })
    }, [userId])

    const deleteAnimal = (event, id) => {
        event.preventDefault();
        
        const token = localStorage.getItem(AUTH_TOKEN)
        const config = {headers: {Authorization: `Bearer ${token}`}}

        axios.delete(`${HEROKU_URL}/animal/${id}`, config)
        .then(response => {
            setWellDone(response.data.message)
            const allAnimals = response.data.animals
            const orderedAnimals = allAnimals.sort(function (a, b) {
                return new Date(b.fechaUsuario) - new Date(a.fechaUsuario)
            })

            setAnimals(orderedAnimals)
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

        closeModal()
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
                            <img src={animal.photo} alt="Foto" className='photoAlertView'/>
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
                        <button className='alert alert-danger deleteAnimalUserButton' type='submit' onClick={() => openModal(animal._id)}>Borrar</button>
                        <div className='modal'>
                            <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className='modal-dialog' value={id}>
                                <div className='modal-content'>
                                    <button onClick={closeModal} className='btn-close'></button>
                                    <div className='modal-title'>¿Seguro que quieres borrar el animal?</div>
                                    <button onClick={(e) => deleteAnimal(e, id)} className='alert alert-danger deleteCommentUserButton'>Borrar</button>
                                </div>
                            </Modal>
                        </div>
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

