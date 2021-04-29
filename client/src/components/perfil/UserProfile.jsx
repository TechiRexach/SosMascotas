import UserAnimals from './UserAnimals.jsx';
import UserComments from './UserComments.jsx';
import { AUTH_TOKEN, HEROKU_URL, DEV_URL } from '../constants/constant.jsx'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory, Link } from 'react-router-dom';
import setAuthToken from '../../utility/authToken';
import NavBar from '../general/Navbar.jsx';
import Modal from 'react-modal';

function UserProfile(props){

    const history = useHistory()

    const [user, setUser] = useState({});
    const [errorMessage, setErrorMessage] = useState('');
    const [welcomeMessage, setWelcomeMessage] = useState('');
    const [wellDone, setWellDone] = useState('');

    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal(){
        setIsOpen(true)
    
    }
    function closeModal(){
        setIsOpen(false)
    }

    useEffect(() => {

        axios.get(`${HEROKU_URL}/users/myprofile`)
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
        axios.delete(`${HEROKU_URL}/users/${user._id}`, config)
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
        closeModal()
    }

    return(
        <div className='profilePage'>
            <NavBar />
            <div key={user._id}>
                {welcomeMessage && <p className='alert alert-secondary helloUser'>{welcomeMessage}</p>}
                <button className='btn btn-light buttonAddAlert' type='button'> <Link to={`/addalert`}> Crear Aviso </Link></button>
                <UserAnimals props={user._id}/>
                <UserComments />
                <div className='userButtonsDesktop'>
                    <button className='btn btn-light userButtons' type='button'><Link to={`/password/${user._id}`}> Modificar contraseña </Link></button>
                    <button className='btn btn-light userButtons' type='submit' onClick={logOut}>Cerrar sesión</button>
                </div>
                {wellDone && <p className='alert alert-success deleteUser'>{wellDone}</p>}
                <button className='alert alert-danger userDeleteButton' type='submit' onClick={openModal}>Borrar cuenta</button>
                <div className='modal'>
                    <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className='modal-dialog' value={user._id}>
                        <div className='modal-content'>
                            <button onClick={closeModal} className='btn-close'></button>
                            <div className='modal-title'>¿Seguro que quieres borrar tu cuenta? <br/> <p className='text-danger'>Debes borrar antes tus animales si no quieres que sigan publicados.</p></div>
                            <button onClick={borrarCuenta} className='alert alert-danger deleteCommentUserButton'>Confirmar</button>
                        </div>
                    </Modal>
                </div>
                {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
            </div>
        </div>
    );
};

export default UserProfile;
