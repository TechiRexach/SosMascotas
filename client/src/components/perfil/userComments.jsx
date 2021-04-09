import './user.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AUTH_TOKEN } from '../constants/constant.jsx';

function UserComments(props){

    const [comments, setComments] = useState([]);
    const [noComments, setNoComments] = useState('');
    const [wellDone, setWellDone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const token = localStorage.getItem(AUTH_TOKEN)
        const config = {headers: {Authorization: `Bearer ${token}`}}
        axios.get('http://localhost:5000/comments/mycomments/', config) 
        .then(response => {
            setComments(response.data.comments) 
            if(response.data.comments.length === 0){
                setNoComments("¡Aun no has escrito ningun comentario!")
            } 
        })
        .catch((err) => {
            setErrorMessage(err.response.data)
        })
    }, [])

    
    const deleteComment = (event) => {
        event.preventDefault()
        const commentId = {
            id: event.target.value
        }

        const token = localStorage.getItem(AUTH_TOKEN)
        const config = {headers: {Authorization: `Bearer ${token}`}}

        axios.delete(`http://localhost:5000/comment/${commentId.id}`, config)
            .then(response => {
                setWellDone(response.data.message)
                setComments(response.data.comments)
                if(response.data.comments.length === 0){
                    setNoComments("¡Aun no has escrito ningun comentario!")
                } 
              
                setTimeout(() => {
                    setWellDone()
                }, 1500)
            })
            .catch(err => {
                setErrorMessage(err.response.data)
            })
    }


    return(
        <div className='form-control userComments'>
            <p>COMENTARIOS</p>
            {noComments && <p className='alert alert-warning'>{noComments}</p>}
            <div className='userAnimalsDesktop'>
            {comments.map(comment => (
                <div key={comment._id} className='form-control oneUserComment'>
                    <div className='commentUserInfo'>
                        <div className='userCommentText'>{comment.place}</div>
                        <div className='userCommentText'>{comment.fechaUsuario}</div>
                        <div className='userCommentText'>{comment.text}</div>
                    </div>
                    <button className='alert alert-danger deleteCommentUserButton' type='submit' name='delete' value={comment._id} onClick={deleteComment}>Borrar</button>
                </div>
            ))}
            </div>
            {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
            {wellDone && <p className='alert alert-success'>{wellDone}</p>}
        </div>
    )
}

export default UserComments;