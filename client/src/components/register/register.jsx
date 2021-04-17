import './register.css';
import { useState } from 'react';
import axios from 'axios';
import { AUTH_TOKEN, HEROKU_URL, DEV_URL } from '../constants/constant.jsx'
import { useHistory } from 'react-router-dom';
import setAuthToken from '../../utility/authToken';
import NavBar from '../general/navbar.jsx';

function Register(){

    const history = useHistory();

    const [errorMessage, setErrorMessage] = useState('');
    const [welcome, setWelcome] = useState('');
    const [newUser, setNewUser] = useState({
        name: '',
        lastname: '',
        phone: '',
        email: '',
        password: ''
    });

    const handleChangeInputs = (event) => {
        setNewUser({
            ...newUser,
            [event.target.name]: event.target.value,
        });
    };

    const enviarDatos = (event) => {
        event.preventDefault()
        axios.post(`${HEROKU_URL}/auth/signup`, {...newUser})
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
                setTimeout(() => {
                    setErrorMessage()
                }, 2000)
        })
    };

    return(
        <div className='registerPage'>
            <NavBar />
            <p className='alert alert-secondary'>REGISTRATE</p>
            {welcome && <div className='alert alert-success'>{welcome}</div>}
            <form action="post" className='registerForm' onSubmit={enviarDatos}>
                <input className='form-control registerInputs one' type="text" name="name" value={newUser.name} placeholder='Nombre:' onChange={handleChangeInputs}/>
                <input className='form-control registerInputs two' type="text" name="lastname" value={newUser.lastname} placeholder='Apellido:' onChange={handleChangeInputs}/>
                <input className='form-control registerInputs three' type="number" name="phone" value={newUser.phone} placeholder='Teléfono:' onChange={handleChangeInputs}/>
                <input className='form-control registerInputs four' type="email" name="email" value={newUser.email} placeholder='Email:'onChange={handleChangeInputs}/>
                <input className='form-control registerInputs' type="password" name="password" value={newUser.password} placeholder='Contraseña:' onChange={handleChangeInputs}/>
            </form>
            {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
            <button className='btn btn-light registerButton' type='submit' onClick={enviarDatos}>Enviar</button>
        </div>
    );
};

export default Register;