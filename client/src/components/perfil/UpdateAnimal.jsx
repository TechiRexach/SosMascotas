import { useState } from 'react';
import axios from 'axios';
import { AUTH_TOKEN, HEROKU_URL, DEV_URL } from '../constants/constant.jsx'
import { useHistory } from 'react-router-dom';
import NavBar from '../general/Navbar.jsx'


function UpdateAnimal(props){

    const animalId = props.match.params.id
    const history = useHistory()

    const [newStatus, setnewStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [wellDone, setWellDone] = useState('');

    const handleChangeStatus = (event) => {
        event.preventDefault()

        const body = {
            status: newStatus
        }

        const token = localStorage.getItem(AUTH_TOKEN)
        const config = {headers: {Authorization: `Bearer ${token}`}}
        axios.put(`${HEROKU_URL}/animal/${animalId}`, body, config)
        .then(response => {
            setWellDone(response.data.message)
            setTimeout(() => {
                history.push('/myprofile')
            }, 2000)
        })
        .catch(err => {
            setErrorMessage(err.response.data)

            setTimeout(() => {
                setErrorMessage()
            }, 2500)
        })
    };

    return(
        <div className='updateAnimalPage'>
            <NavBar />
        <form className='updateForm'>
            {wellDone && <p className='alert alert-success'>{wellDone}</p>}
            <select className='form-select' type="text" name="status" onChange={(event) => setnewStatus(event.target.value)}>
                <option value="tipoAviso" defaultChecked>Actualizar estado</option>
                <option value='Perdido' name='Perdido' >Perdido</option>
                <option value='Encontrado' name='Encontrado' >Encontrado</option>
                <option value='En casa' name='En casa' >En casa</option>
            </select>
            <button className='btn btn-light updateFormButton' onClick={handleChangeStatus}>Enviar</button>
            {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
        </form>
        </div>
    );
};

export default UpdateAnimal;
