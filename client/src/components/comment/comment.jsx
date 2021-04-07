import './comment.css'
import { useState } from 'react';
import axios from 'axios';
import { AUTH_TOKEN } from '../constants/constant.jsx'
import { useHistory } from 'react-router-dom';

function AddComment(props){

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
        })
    };

    const [errorMessage, setErrorMessage] = useState('');
    const [wellDone, setCreatedComment] = useState('')

    return(
        <form action='post' className='addComment' onSubmit={createComment}>
            {wellDone && <h3 className='createdComment'>{wellDone}</h3>}
            <input className='inputPlaceComment' type="text" name="place" value={newComment.place} placeholder='Lugar:' onChange={handleChangeInput}/>
            <input className='inputDateComment' type="text" name="fechaUsuario" value={newComment.fechaUsuario} placeholder='Fecha: (dd/mm/aaaa)' onChange={handleChangeInput}/>
            <textarea className='inputTextComment' type="text" name="text" value={newComment.text} placeholder='Texto:' onChange={handleChangeInput}/>
            <button className='buttonAddComment' onClick={createComment}>Enviar</button>
            {errorMessage && <h3 className='errorComment'>{errorMessage}</h3>}
        </form>
    );
};

export default AddComment;