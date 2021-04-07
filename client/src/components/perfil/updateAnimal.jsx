import { useState } from 'react';
import axios from 'axios';
import { AUTH_TOKEN } from '../constants/constant.jsx'

function UpdateAnimal(props){
    console.log(props)

    const animalId = props.match.params.id

    const [newStatus, setnewStatus] = useState('');
    console.log(newStatus)

    const handleChangeStatus = (event) => {
        event.preventDefault()

        const body = {
            status: newStatus
        }
        
        console.log(body)

        const token = localStorage.getItem(AUTH_TOKEN)
        const config = {headers: {Authorization: `Bearer ${token}`}}
        axios.put(`http://localhost:5000/animal/${animalId}`, body, config)
        .then(response => {
            console.log(response.data)
            setWellDone(response.data.message)
        })
        .catch(err => {
            console.log(err.response)
            setErrorMessage(err.response)
        })
    };


    const [errorMessage, setErrorMessage] = useState('');
    const [wellDone, setWellDone] = useState('');

    return(
        <form >
            {wellDone && <div >{wellDone}</div>}
            <select type="text" name="status" onChange={(event) => setnewStatus(event.target.value)}>
                <option value="tipoAviso" defaultChecked>Actualizar estado</option>
                <option value='Perdido' name='Perdido' >Perdido</option>
                <option value='Encontrado' name='Encontrado' >Encontrado</option>
                <option value='En casa' name='En casa' >En casa</option>
            </select>
            <button onClick={handleChangeStatus}>Enviar</button>
            {errorMessage && <div>{errorMessage}</div>}
        </form>
    );
};

export default UpdateAnimal;