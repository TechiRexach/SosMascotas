import './comment.css'
import { useState } from 'react';
import axios from 'axios';
import { AUTH_TOKEN } from '../constants/constant.jsx'
import { useHistory } from 'react-router-dom';
import NavBar from '../general/navbar.jsx'


function NoToken(){
    const history = useHistory()
    const token = localStorage.getItem(AUTH_TOKEN)
      
        if(!token){
            history.push('/login')
        }
}

function AddComment(props){

    NoToken()
    const [errorMessage, setErrorMessage] = useState('');
    const [wellDone, setCreatedComment] = useState('');

    const [newComment, setNewComment] = useState({
        animal: props.match.params.id,
        text: '',
        place: '',
        fechaUsuario: ''
    })

    const handleChangeInput = (event) => { 
        setNewComment({
            ...newComment,
            [event.target.name]: event.target.value,
        })
    }

    const history = useHistory()

    const createComment = (event) => {
        event.preventDefault()

        const token = localStorage.getItem(AUTH_TOKEN)
        const config = {headers: {Authorization: `Bearer ${token}`}}


        axios.post('http://localhost:5000/addcomment', {...newComment}, config)
        .then((response) => {
            setCreatedComment(response.data.message)

            setTimeout(() => {
                history.goBack()
            }, 1000)

        })
        .catch((err) => {
                setErrorMessage(err.response.data)
                setTimeout(() => {
                   setErrorMessage()
                }, 1500)
        })
    };

    return(
        <div>
            <NavBar />
        <form action='post' className='addComment' onSubmit={createComment}>
            {wellDone && <h3 className='alert alert-success createdComment'>{wellDone}</h3>}
            <input className='form-control inputPlaceComment' type="text" name="place" value={newComment.place} placeholder='Lugar:' onChange={handleChangeInput}/>
            <input className='form-control inputDateComment' type="text" name="fechaUsuario" value={newComment.fechaUsuario} placeholder='Fecha: (dd/mm/aaaa)' onChange={handleChangeInput}/>
            <textarea className='form-control inputTextComment' type="text" name="text" value={newComment.text} placeholder='Texto:' onChange={handleChangeInput}/>
            <button className='btn btn-light buttonAddComment' onClick={createComment}>Enviar</button>
            {errorMessage && <h3 className='alert alert-danger'>{errorMessage}</h3>}
        </form>
        </div>
    );
};

export default AddComment;