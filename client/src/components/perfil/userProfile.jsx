import UserAnimals from './userAnimals.jsx';
import UserComments from './userComments.jsx';
import { AUTH_TOKEN } from '../constants/constant.jsx'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import setAuthToken from '../../utility/authToken'

function UserProfile(props){

    const history = useHistory()

    const [user, setUser] = useState({})
    const [errorMessage, setErrorMessage] = useState('');
    const [welcomeMessage, setWelcomeMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem(AUTH_TOKEN)
        const config = {headers: {Authorization: `Bearer ${token}`}}

        axios.get('http://localhost:5000/users/myprofile', config)
        .then((response) => {
            setUser(response.data.user)
            setWelcomeMessage(response.data.message)
        })
        .catch((error) => {
            setErrorMessage(error.response.data)
        })
    },[])


    const logOut = () => {
        localStorage.removeItem(AUTH_TOKEN)
        setAuthToken();
        setTimeout(() => {
            history.push('/')
        }, 2000)
    }

    function borrarCuenta(){
        const token = localStorage.getItem(AUTH_TOKEN)
        const config = {headers: {Authorization: `Bearer ${token}`}}
        axios.delete(`http://localhost:5000/users/${user._id}`, config)
        .then(response => {
           
            setTimeout(() => {
                history.push('/')
            }, 1000)

            setUser(response.data.user)
        })
        .catch(err => {
            console.log(err.data)
            setErrorMessage(err.data)
        })
    }


    return(
        <div key={user._id}>
            {welcomeMessage && <h3 className='welcomeProfile'>{welcomeMessage}</h3>}
            <button className='buttonAddAlert' type='button'> <Link to={`/addalert/${user._id}`}> Crear Aviso </Link></button>
            <UserAnimals />
            <UserComments />
            <button className='userButtons' type='button'><Link to={`/password/${user._id}`}> Modificar contraseña </Link></button>
            <button className='userButtons' type='submit' onClick={logOut}>Cerrar sesión</button>
            <button className='userDeleteButton' type='submit' onClick={borrarCuenta}>Borrar cuenta</button>
            {errorMessage && <div className='errorProfile'>{errorMessage}</div>}
        </div>
    );
};

export default UserProfile;