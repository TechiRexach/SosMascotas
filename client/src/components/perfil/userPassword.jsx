import './user.css';
import { AUTH_TOKEN } from '../constants/constant.jsx'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

function UserAccions(props){
    
    const history = useHistory()
    
    const [user, setUser] = useState({})
    console.log(user)

    useEffect(() => {
        const token = localStorage.getItem(AUTH_TOKEN)
        const config = {headers: {Authorization: `Bearer ${token}`}}

        axios.get('http://localhost:5000/users/myprofile', config)
        .then((response) => {
            setUser(response.data.user)
        })
        .catch((error) => {
            console.log(error.response.data)
        })
    },[])

    const [newPassword, setNewPassword] = useState('')
        console.log(newPassword)

    const handleChangePassword = (event) => {
        event.preventDefault()

        const body = {
            password: newPassword
        }
        console.log(body)

        const token = localStorage.getItem(AUTH_TOKEN)
        const config = {headers: {Authorization: `Bearer ${token}`}}
        axios.put(`http://localhost:5000/users/password/`, body, config)
        .then(response => {
            console.log(response.data.message)
            setWellDone(response.data.message)
           
            setTimeout(() => {
                history.push('/myprofile')
            }, 1500)
        })
        .catch(err => {
            console.log(err.response.data)
            setErrorMessage(err.response.data)
        })
    }

    const [wellDone, setWellDone] = useState('')
    const [errorMessage, setErrorMessage] = useState('');
    
    return(
        <div className='chagePasswordForm'>
            {wellDone && <h3 className='wellDonePassword'>{wellDone}</h3>}
            <p>{user.name}, aquí puedes cambiar tu contraseña:</p>
            <input type="password" placeholder='Nueva contraseña:' name='password' value={newPassword} onChange={(event) => setNewPassword(event.target.value)}/>
            <button className='userButtons' onClick={handleChangePassword} >Cambiar</button>
            {errorMessage && <h4 className='errorPassword'>{errorMessage}</h4>}
        </div>
    )
}

export default UserAccions;