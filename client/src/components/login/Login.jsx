import './login.css'
import { useState } from 'react';
import axios from 'axios';
import { AUTH_TOKEN, HEROKU_URL, DEV_URL } from '../constants/constant.jsx'
import { useHistory } from 'react-router-dom';
import setAuthToken from '../../utility/authToken'
import NavBar from '../general/Navbar.jsx'

function Login(){

    const [logedUser, setLogedUser] = useState({
        email: '',
        password: ''
    })

    const handleChangeInput = (event) => {
        setLogedUser({
            ...logedUser,
            [event.target.name]: event.target.value,
        })
    }

    const [errorMessage, setErrorMessage] = useState('');
    const [welcome, setWelcome] = useState('');
    const history = useHistory();

    const login = (event) => {
        event.preventDefault()
        axios.post(`${HEROKU_URL}/auth/login`, {...logedUser})
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
        <div className='loginPage'>
            <NavBar />
            <p className='alert alert-secondary'>IDENTIFICATE</p>
            {welcome && <div className='alert alert-success'>{welcome}</div>}
            <form action="post" className='loginForm' onSubmit={login}>
                <input className='form-control loginInputs' type="email" name="email" value={logedUser.email} placeholder='Email:' onChange={handleChangeInput}/>
                <input className='form-control loginInputs' type="password" name="password" value={logedUser.password} placeholder='Contraseña:' onChange={handleChangeInput}/>
            </form>
            <button className='btn btn-light loginButton' type='submit' onClick={login}>Enviar</button>
            {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
        </div>
    );
};

export default Login;

