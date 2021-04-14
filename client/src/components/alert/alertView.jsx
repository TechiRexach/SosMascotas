import './alertView.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import NavBar from '../general/navbar.jsx';
import moment from 'moment';
import 'moment/locale/es'


function AlertView(props){

    const [animal, setAnimal] = useState({});
    const [formatDate, setFormatDate] = useState('');
    const [comments, setComments] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [noComments, setNoComments] = useState('');
   
    const animalDate = moment(formatDate).format('L')

    useEffect(() => {
        axios.get(`http://localhost:5000/animals/${props.match.params.id}`)
        .then(response => {
            setFormatDate(response.data.animal.fechaUsuario)
            setAnimal(response.data.animal)
        })
        .catch((err) => {
            setErrorMessage(err.response)
        })
      }, [props.match.params.id])

    
    useEffect(() => {
       
        axios.get("http://localhost:5000/comments/animal/" + props.match.params.id) 
        .then(response => {
            setComments(response.data.comments)

            if(response.data.comments.length <= 0){
                setNoComments(response.data.message)
            }
        })
        .catch((err) => {
            setErrorMessage(err.response)
        })
    }, [props.match.params.id])

    return(
        <div>
            <NavBar />
            <div key={animal._id}>
                <div key={animal.photo} className='alertViewPhoto'>
                    <img src={`http://localhost:5000/storage/${animal.photo}`} alt="Foto" className='photoAlertView'/>
                </div>
                <div>
                    <button className='btn btn-light alertViewButton'>
                        <Link to={`/addcomment/${animal._id}`}>
                            <p >¿Me has visto o me conoces?</p>
                            <p className='bold'>¡Crea un comentario!</p> 
                        </Link>
                    </button>
                </div>
                <div className='alertViewStatus'>
                    <div className='alertViewType'>{animal.status}</div>
                </div>
                <div className='alertView'>
                    <div className='alertViewAllInfo'>
                        <div className='form-control alertViewInfo'>{animal.species}</div>
                        <div className='form-control alertViewInfo'>{animal.breed}</div>
                        <div className='form-control alertViewInfo'>{animal.colour}</div>
                        <div className='form-control alertViewInfo'>{animal.sex}</div>
                        <hr/>
                        <div className='form-control alertViewInfo'>{animal.place}</div>
                        <div className='form-control alertViewInfo'>{animal.cp}</div>
                        <div className='form-control alertViewInfo'>{animalDate}</div>
                        <hr/>
                        <div className='form-control alertViewInfo'>{animal.fasteners}</div>
                        <div className='form-control alertViewInfo'>{!animal.chip ? 'No tiene chip / No lo se' : 'Tiene chip'}</div>
                        <div className='form-control alertViewInfo'>{!animal.idTag ? 'No lleva chapa' : 'Lleva chapa'}</div>
                        <div className='form-control alertViewInfo'>{animal.name}</div>
                    </div>
                    <div className='form-control alertViewComments'>
                        <p className='bold'>COMENTARIOS</p>
                        {noComments && <div className='alert alert-warning'>{noComments}</div>}
                        {comments.map(comment => (
                            <div key={comment._id} className='form-control alertViewOneComment'>
                                <div className='oneCommentInfo'>
                                    <div>{comment.place}</div>
                                    <div>{moment(comment.fechaUsuario).format('L')}</div>
                                    <div>{comment.text}</div>
                                    <hr/>
                                    <div className='creatorUser'>{comment.creatorUser.name} / {comment.creatorUser.email}</div>
                                </div>
                            </div>
                        ))}
                        {errorMessage && <div className='alert alert-danger'>{errorMessage}</div>}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default AlertView;