import './alertForm.css'
import { useState } from 'react';
import axios from 'axios';
import FormData from 'form-data'
import { AUTH_TOKEN } from '../constants/constant.jsx'
import { useHistory } from 'react-router-dom';

function AlertForm(props){

    const [newPhoto, setNewPhoto] = useState({
        photo: []
    })
    console.log(newPhoto)

    const handleChangePhoto = (event) => {
        setNewPhoto({
            photo: event.target.files[0]
        })
    }

    const [newAlert, setNewAlert] = useState({
            species: '',
            name: '',
            breed: '',
            colour: '',
            sex: '',
            idTag: '',
            fasteners: '',
            chip: '',
            place: '',
            cp: '',
            fechaUsuario: '',
            status: ''
    });

    const handleChangeInput = (event) => {
        setNewAlert({
            ...newAlert,
            [event.target.name]: event.target.value,
        })
    };

    console.log(newAlert)
    const history = useHistory()

    const createAlert = (event) => {
        event.preventDefault()

        const token = localStorage.getItem(AUTH_TOKEN)
        const config = {headers: {Authorization: `Bearer ${token}`}}

        const formData = new FormData();
        formData.append('photo', newPhoto.photo);
        formData.append('species', newAlert.species)
        formData.append('name', newAlert.name)
        formData.append('breed', newAlert.breed)
        formData.append('colour', newAlert.colour)
        formData.append('sex', newAlert.sex)
        formData.append('idTag', newAlert.idTag)
        formData.append('fasteners', newAlert.fasteners)
        formData.append('chip', newAlert.chip)
        formData.append('place', newAlert.place)
        formData.append('cp', newAlert.cp)
        formData.append('fechaUsuario', newAlert.fechaUsuario)
        formData.append('status', newAlert.status)
        

        axios.post('http://localhost:5000/addanimal', formData, {headers: {'Content-Type': 'application/json'}}, config)
        .then((response) => {
            setCreatedAlert(response.data.message)

            setTimeout(() => {
                history.push('/myprofile')
            }, 1000)

        })
        .catch((err) => {
            setErrorMessage(err.response.data)
        })
    };

    const [errorMessage, setErrorMessage] = useState('');
    const [wellDone, setCreatedAlert] = useState('');

    return(
        <form action='post' className='addAlert' onSubmit={createAlert} encType='multipart/form-data'>
            {wellDone && <div className='createdAlert'>{wellDone}</div>}
            <select className='selectAlertType' type="text" name="status" value={newAlert.status} placeholder='Tipo aviso:' onChange={handleChangeInput}>
                <option value="tipoAviso" defaultChecked>TIPO AVISO</option>
                <option value="Perdido">Perdido</option>
                <option value="Encontrado">Encontrado</option>
            </select>
            <input className='inputSpecie' type="text" name="species" value={newAlert.species} placeholder='Especie:' onChange={handleChangeInput} required/>
            <input className='inputBreed' type="text" name="breed" value={newAlert.breed} placeholder='Raza:' onChange={handleChangeInput}/>
            <input className='inputColour' type="text" name="colour" value={newAlert.colour} placeholder='Color:' onChange={handleChangeInput} required/>
            <input className='inputSex' type="text" name="sex" value={newAlert.sex} placeholder='Sexo:' onChange={handleChangeInput}/>
            <input className='inputAlertPlace' type="text" name="place" value={newAlert.place} placeholder='Lugar:' onChange={handleChangeInput} required/>
            <input className='inputCP' type="number" name="cp" value={newAlert.cp} placeholder='Código Postal:' onChange={handleChangeInput} required/>
            <input className='inputAlertDate' type="text" name="fechaUsuario" value={newAlert.fechaUsuario} placeholder='Fecha: (dd/mm/aaaa)' onChange={handleChangeInput} required/>
            <input className='inputFasteners' type="text" name="fasteners" value={newAlert.fasteners} placeholder='Sujecciones:' onChange={handleChangeInput} required/>
            <div>
                <label htmlFor="Chip">Microchip:</label>
                <div className='inputRadio'>
                    <p>Si</p>
                    <input className='inputRadioOpcion' id='Chip' type="radio" name="chip" value={true} onChange={handleChangeInput}/> 
                </div>
                <div className='inputRadio'>
                    <p>No</p>
                    <input className='inputRadioOpcion' id='Chip' type="radio" name="chip" value={false} onChange={handleChangeInput}/>
                </div>
            </div>
            <hr/>
            <div>
                <label htmlFor="IdTag">*Chapa identificativa:</label>
                <div className='inputRadio'>
                    <p>Si</p> 
                    <input className='inputRadioOpcion' id='IdTag' type="radio" name="idTag" value={true} onChange={handleChangeInput}/>
                </div>
                <div className='inputRadio'>
                    <p>No</p> 
                    <input className='inputRadioOpcion' id='IdTag' type="radio" name="idTag" value={false} onChange={handleChangeInput}/>
                </div>
            </div>
            <input className='inputAlertName' type="text" name="name" value={newAlert.name} placeholder='Nombre:' onChange={handleChangeInput}/>
            <div className='photoForm'>
                <label htmlFor="photo">Sube una foto:</label>
                <input className='inputPhoto' type="file" name="file" accept='image/*' onChange={handleChangePhoto}/>
            </div>
            <button className='buttonCreateAlert' onClick={createAlert}>Enviar</button>
            {errorMessage && <div className='errorAlert'>{errorMessage}</div>}
        </form>
    );
};

export default AlertForm;