import UserAnimals from './userAnimals.jsx';
import UserComments from './userComments.jsx';
import { AUTH_TOKEN } from '../constants/constant.jsx'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import setAuthToken from '../../utility/authToken';
import NavBar from '../general/navbar.jsx'

function UserProfile(props){

    const history = useHistory()

    const [user, setUser] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const [wellDone, setWellDone] = useState('');

    useEffect(() => {

        axios.get('http://localhost:5000/users/myprofile')
        .then((response) => {
            setUser(response.data.user)
            setWelcomeMessage(response.data.message)
            setTimeout(() => {
                setWelcomeMessage()
            }, 3000)
        })
        .catch((error) => {
            setErrorMessage(error.response.data)
            localStorage.removeItem(AUTH_TOKEN)
            history.push('/login')
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
            setWellDone(response.data.message)
            
            setTimeout(() => {
                history.push('/');
                localStorage.removeItem(AUTH_TOKEN)
            }, 2000)

        })
        .catch(err => {
            setErrorMessage(err.response)
        })
    }


    return(
        <div className='profilePage'>
            <NavBar />
            <div key={user._id}>
                {welcomeMessage && <p className='alert alert-secondary helloUser'>{welcomeMessage}</p>}
                <button className='btn btn-light buttonAddAlert' type='button'> <Link to={`/addalert/${user._id}`}> Crear Aviso </Link></button>
                <UserAnimals />
                <UserComments />
            <div className='userButtonsDesktop'>
            <button className='btn btn-light userButtons' type='button'><Link to={`/password/${user._id}`}> Modificar contraseña </Link></button>
            <button className='btn btn-light userButtons' type='submit' onClick={logOut}>Cerrar sesión</button>
            </div>
            {wellDone && <p className='alert alert-success deleteUser'>{wellDone}</p>}
            <button className='alert alert-danger userDeleteButton' type='submit' onClick={borrarCuenta}>Borrar cuenta</button>
            {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
        </div>
        </div>
    );
};

export default UserProfile;