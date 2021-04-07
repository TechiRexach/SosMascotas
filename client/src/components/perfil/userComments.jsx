import './user.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AUTH_TOKEN } from '../constants/constant.jsx';

function UserComments(props){

    const [comments, setComments] = useState([]);
    const [noComments, setNoComments] = useState('');
    const [wellDone, setWellDone] = useState('')

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
            return console.log(err)
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
                console.log(err.response.data)
            })
    }


    return(
        <div className='userComments'>
            <p>COMENTARIOS</p>
            {noComments && <p className='noCommentsUser'>{noComments}</p>}
            {comments.map(comment => (
                <div key={comment._id} className='oneUserComment'>
                    <div className='commentUserInfo'>
                        <div>{comment.place}</div>
                        <div>{comment.fechaUsuario}</div>
                        <div>{comment.text}</div>
                    </div>
                    <button className='deleteCommentUserButton' type='submit' name='delete' value={comment._id} onClick={deleteComment}>Borrar</button>
                </div>
            ))}
            {wellDone && <p className='wellDoneDeleteComment'>{wellDone}</p>}
        </div>
    )
}

export default UserComments;