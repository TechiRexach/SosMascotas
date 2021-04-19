import './comment.css'
import { useState } from 'react';
import axios from 'axios';
import { AUTH_TOKEN, HEROKU_URL, DEV_URL } from '../constants/constant.jsx'
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


        axios.post(`${HEROKU_URL}/addcomment`, {...newComment}, config)
        .then((response) => {
            console.log(response)
            setCreatedComment(response.data.message)

            setTimeout(() => {
                history.goBack()
            }, 1000)

        })
        .catch((err) => {
                console.log(err.response)
                setErrorMessage(err.response.data)
                setTimeout(() => {
                   setErrorMessage()
                }, 2500)
        })
    };

    return(
        <div className='commentPage'>
            <NavBar />
            <p className='alert alert-secondary'>COMENTARIO</p>
            <form action='post' className='addComment' onSubmit={createComment}>
                {wellDone && <p className='alert alert-success createdComment'>{wellDone}</p>}
                <input className='form-control inputPlaceComment' type="text" name="place" value={newComment.place} placeholder='Lugar:' onChange={handleChangeInput}/>
                <input className='form-control inputDateComment' type="date" name="fechaUsuario" value={newComment.fechaUsuario} placeholder='Fecha:' onChange={handleChangeInput}/>
                <textarea className='form-control inputTextComment' type="text" name="text" value={newComment.text} placeholder='Texto:' onChange={handleChangeInput}/>
                <button className='btn btn-light buttonAddComment' onClick={createComment}>Enviar</button>
                {errorMessage && <h3 className='alert alert-danger'>{errorMessage}</h3>}
            </form>
        </div>
    );
};

export default AddComment;