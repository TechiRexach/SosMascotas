import './user.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AUTH_TOKEN } from '../constants/constant.jsx';
import moment from 'moment';
import 'moment/locale/es';
import Modal from 'react-modal';


function UserComments(props){

    const [comments, setComments] = useState([]);
    const [noComments, setNoComments] = useState('');
    const [wellDone, setWellDone] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [id, setID] = useState('');

    const [modalIsOpen, setIsOpen] = useState(false);
    function openModal(id){
        setIsOpen(true)
        setID(id)
    }
    function closeModal(){
        setIsOpen(false)
    }

    
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

    
    const deleteComment = (event, id) => {
        event.preventDefault()

        const token = localStorage.getItem(AUTH_TOKEN)
        const config = {headers: {Authorization: `Bearer ${token}`}}

        axios.delete(`http://localhost:5000/comment/${id}`, config)
            .then(response => {
                setWellDone(response.data.message)
                setComments(response.data.comments)
                if(response.data.comments.length === 0){
                    setNoComments("¡Aun no has escrito ningun comentario!")
                } 
              
                setTimeout(() => {
                    setWellDone()
                }, 1500)
            },[setWellDone])
            .catch(err => {
                setErrorMessage(err.response.data)
                setTimeout(() => {
                    setErrorMessage()
                }, 1500)
            })
        closeModal()
    }

    return(
        <div className='form-control userComments'>
            <p>COMENTARIOS</p>
            {noComments && <p className='alert alert-warning'>{noComments}</p>}
            <div className='userCommentsDesktop'>
            {comments.map(comment => (
                <div key={comment._id} className='form-control oneUserComment'>
                    <div className='commentUserInfo'>
                        <div className='userCommentText'>{comment.place}</div>
                        <div className='userCommentText'>{moment(comment.fechaUsuario).format('L')}</div>
                        <div className='userCommentText'>{comment.text}</div>
                        <hr/>
                        <div className='userCommentText'>{comment.animal.species}</div>
                    </div>
                    <button className='alert alert-danger deleteCommentUserButton' value={comment._id} type='submit' name='delete' onClick={()=> openModal(comment._id)}>Borrar</button>
                    <div className='modal'>
                        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className='modal-dialog' value={id}>
                            <div className='modal-content'>
                                <button onClick={closeModal} className='btn-close'></button>
                                <div className='modal-title'>¿Seguro que quieres borrar el comentario?</div>
                                <button onClick={(e)=> deleteComment(e, id)} className='alert alert-danger deleteCommentUserButton'>Borrar</button>
                            </div>
                        </Modal>
                    </div>
                </div>
            ))}
            </div>
            {errorMessage && <p className='alert alert-danger'>{errorMessage}</p>}
            {wellDone && <p className='alert alert-success'>{wellDone}</p>}
        </div>
    )
}

export default UserComments;