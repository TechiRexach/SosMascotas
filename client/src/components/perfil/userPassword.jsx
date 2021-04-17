import './user.css';
import { AUTH_TOKEN, HEROKU_URL, DEV_URL } from '../constants/constant.jsx'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import NavBar from '../general/navbar.jsx';

function UserAccions(props){
    
    const history = useHistory()
    
    const [user, setUser] = useState({});
    const [newPassword, setNewPassword] = useState('');
    const [wellDone, setWellDone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem(AUTH_TOKEN)
        const config = {headers: {Authorization: `Bearer ${token}`}}

        axios.get(`${HEROKU_URL}/users/myprofile`, config)
        .then((response) => {
            setUser(response.data.user)
        })
        .catch((error) => {
            setErrorMessage(error.response.data)
        })
    },[])

    const handleChangePassword = (event) => {
        event.preventDefault()

        const body = {
            password: newPassword
        }

        const token = localStorage.getItem(AUTH_TOKEN)
        const config = {headers: {Authorization: `Bearer ${token}`}}
        axios.put(`${HEROKU_URL}/users/password/`, body, config)
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
            }, 2000)
        })
    }

    return(
        <div className='passwordPage'>
            <NavBar />
            <div className='changePasswordForm'>
                {wellDone && <p className='alert alert-success changedPassword'>{wellDone}</p>}
                <p className='alert alert-secondary'>{user.name}, introduce tu nueva contraseña:</p>
                <input className='form-control inputNewPassword' id='newPassword' type="password" placeholder='Nueva contraseña:' name='password' value={newPassword} onChange={(event) => setNewPassword(event.target.value)}/>
                <button className='btn btn-light changePasswordButton' onClick={handleChangePassword} >Cambiar</button>
                {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
            </div>
        </div>
    )
}

export default UserAccions;