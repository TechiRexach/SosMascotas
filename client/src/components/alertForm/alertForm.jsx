import './alertForm.css'
import { useState } from 'react';
import axios from 'axios';
import FormData from 'form-data'
import { AUTH_TOKEN, HEROKU_URL, DEV_URL } from '../constants/constant.jsx'
import { useHistory } from 'react-router-dom';
import NavBar from '../general/navbar.jsx'

function AlertForm(props){

    const history = useHistory();

    const [errorMessage, setErrorMessage] = useState('');
    const [wellDone, setCreatedAlert] = useState('');

    const [newPhoto, setNewPhoto] = useState('')
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
            idTag: 'false',
            fasteners: '',
            chip: 'false',
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

    const uploadPhoto = (event) => {
        event.preventDefault()
        const token = localStorage.getItem(AUTH_TOKEN)
        const config = {headers: {Authorization: `Bearer ${token}`}}

        const photoData = new FormData();
        photoData.append('photo', newPhoto.photo);
        photoData.append('upload_preset', 'shromt1d')

        axios.post('https://api.cloudinary.com/v1_1/techirexach/image/upload', photoData, {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}}, config)
        .then((response) => {
            console.log(response)
        })
        .catch((err) => {
            console.log(err)
        })

    }
    

    const createAlert = (event) => {
        event.preventDefault()

        const token = localStorage.getItem(AUTH_TOKEN)
        const config = {headers: {Authorization: `Bearer ${token}`}}

        const formData = new FormData();
        // formData.append('photo', newPhoto.photo);
        // formData.append('upload_preset', 'shromt1d')
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

        axios.post(`${HEROKU_URL}/addanimal`, formData, {headers: {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'}}, config)
        .then((response) => {
            setCreatedAlert(response.data.message)
            console.log(response.data)

            setTimeout(() => {
                history.push('/myprofile')
            }, 2000)

        })
        .catch((err) => {
            setErrorMessage(err.response)
            setTimeout(() => {
                setErrorMessage()
            }, 2500)
        })
    };

    return(
        <div>
            <NavBar />
            <p className='alert alert-secondary'>NUEVO AVISO</p>
        <form action='/addanimal' method='POST' className='addAlert' onSubmit={createAlert} encType='multipart/form-data'>
            <select className='form-select selectAlertType' type="text" name="status" value={newAlert.status} placeholder='Tipo aviso:' onChange={handleChangeInput}>
                <option value="tipoAviso" defaultChecked>*TIPO AVISO</option>
                <option value="Perdido">Perdido</option>
                <option value="Encontrado">Encontrado</option>
            </select>
            <input className='form-control inputAddAlert' type="text" name="species" value={newAlert.species} placeholder='*Especie:' onChange={handleChangeInput} required/>
            <input className='form-control inputAddAlert' type="text" name="breed" value={newAlert.breed} placeholder='Raza:' onChange={handleChangeInput}/>
            <input className='form-control inputAddAlert' type="text" name="colour" value={newAlert.colour} placeholder='*Color:' onChange={handleChangeInput} required/>
            <input className='form-control inputAddAlert' type="text" name="sex" value={newAlert.sex} placeholder='Sexo:' onChange={handleChangeInput}/>
            <input className='form-control inputAddAlert' type="text" name="place" value={newAlert.place} placeholder='*Lugar:' onChange={handleChangeInput} required/>
            <input className='form-control inputAddAlert' type="number" name="cp" value={newAlert.cp} placeholder='*Código Postal:' onChange={handleChangeInput} required/>
            <input className='form-control inputAddAlert' type="date" name="fechaUsuario" value={newAlert.fechaUsuario} onChange={handleChangeInput} required/>
            <input className='form-control inputAddAlert' type="text" name="fasteners" value={newAlert.fasteners} placeholder='*Sujecciones:' onChange={handleChangeInput} required/>
            <div>
                <label htmlFor="Chip">Microchip:</label>
                <div className='inputRadio'>
                    <p>Si</p>
                    <input className='form-check-input' id='Chip' type="radio" name="chip" value={'true'} onChange={handleChangeInput} checked={newAlert.chip === 'true'}/> 
                </div>
                <div className='inputRadio'>
                    <p>No / No lo sé</p>
                    <input className='form-check-input' id='Chip' type="radio" name="chip" value={'false'} onChange={handleChangeInput} checked={newAlert.chip === 'false'}/>
                </div>
            </div>
            <hr/>
            <div>
                <label htmlFor="IdTag">*Chapa identificativa:</label>
                <div className='inputRadio'>
                    <p>Si</p> 
                    <input className='form-check-input' id='IdTag' type="radio" name="idTag" value={true} onChange={handleChangeInput} checked={newAlert.idTag === 'true'}/>
                </div>
                <div className='inputRadio'>
                    <p>No</p> 
                    <input className='form-check-input' id='IdTag' type="radio" name="idTag" value={false} onChange={handleChangeInput} checked={newAlert.idTag === 'false'}/>
                </div>
            </div>
            <input className='form-control inputAddAlert' type="text" name="name" value={newAlert.name} placeholder='Nombre:' onChange={handleChangeInput}/>
            <div className='photoForm'>
                <label htmlFor="photo">Sube una foto:</label>
                <input className='inputPhoto' type="file" name="photo" accept='image/*' onChange={handleChangePhoto} />
            </div>
            {errorMessage && <p className='alert alert-danger newAlert'>{errorMessage}</p>}
            {wellDone && <p className='alert alert-success'>{wellDone}</p>}
            <button className='btn btn-light buttonCreateAlert' onClick={createAlert, uploadPhoto}>Enviar</button>
        </form>
        </div>
    );
};

export default AlertForm;