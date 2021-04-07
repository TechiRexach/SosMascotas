import './register.css'
import { useState } from 'react';
import axios from 'axios';
import { AUTH_TOKEN } from '../constants/constant.jsx'
import { useHistory } from 'react-router-dom';
import setAuthToken from '../../utility/authToken'

function Register(){

    const [newUser, setNewUser] = useState({
        name: '',
        lastname: '',
        phone: '',
        email: '',
        password: ''
    })

    const handleChangeInputs = (event) => {
        setNewUser({
            ...newUser,
            [event.target.name]: event.target.value,
        });
    };

    const history = useHistory()
    
    const enviarDatos = (event) => {
        event.preventDefault()
        axios.post('http://localhost:5000/auth/signup', {...newUser})
        .then((response) => {
            setWelcome(response.data.message)

            const token = response.data.token;
            localStorage.setItem(AUTH_TOKEN, token)
            setAuthToken(token)

            setTimeout(() => {
                history.push('/myprofile')
            }, 2000)
        })
        .catch((err) => {
                setErrorMessage(err.response.data)
        })
    }

    const [errorMessage, setErrorMessage] = useState('');
    const [welcome, setWelcome] = useState('')

  
    return(
        <div>
            <form action="post" className='registerForm' onSubmit={enviarDatos}>
                {welcome && <div className='welcome'>{welcome}</div>}
                <input className='registerInputs' type="text" name="name" value={newUser.name} placeholder='Nombre:' onChange={handleChangeInputs}/>
                <input className='registerInputs' type="text" name="lastname" value={newUser.lastname} placeholder='Apellido:' onChange={handleChangeInputs}/>
                <input className='registerInputs' type="number" name="phone" value={newUser.phone} placeholder='Teléfono:' onChange={handleChangeInputs}/>
                <input className='registerInputs' type="email" name="email" value={newUser.email} placeholder='Email:'onChange={handleChangeInputs}/>
                <input className='registerInputs' type="password" name="password" value={newUser.password} placeholder='Contraseña:' onChange={handleChangeInputs}/>
                <button className='registerButton' type='submit' onClick={enviarDatos}>Enviar</button>
                {errorMessage && <div className='error'>{errorMessage}</div>}
            </form>
        </div>
    );
};

export default Register;