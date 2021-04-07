import './alertView.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AlertView(props){

    const [animal, setAnimal] = useState({});
    const [comments, setComments] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [noComments, setNoComments] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/animals/${props.match.params.id}`)
        .then(response => {
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
            <div key={animal._id}>
                    <div key={animal.photo} className='alertViewPhoto'>
                        <img src={`http://localhost:5000/storage/${animal.photo}`} alt="Foto" className='photoAlertView'/>
                    </div>
                    <div>
                        <button className='alertViewButton'>
                        <Link to={`/addcomment/${animal._id}`}>
                            <p>¿Me has visto o me conoces?</p>
                            <p className='bold'>¡Crea un comentario!</p> 
                        </Link>
                        </button>
                    </div>
                    <div className='alertViewType'>{animal.status}</div>
                    <div className='alertViewInfo'>{animal.species}</div>
                    <div className='alertViewInfo'>{animal.breed}</div>
                    <div className='alertViewInfo'>{animal.colour}</div>
                    <div className='alertViewInfo'>{animal.sex}</div>
                    <hr/>
                    <div className='alertViewInfo'>{animal.place}</div>
                    <div className='alertViewInfo'>{animal.cp}</div>
                    <div className='alertViewInfo'>{animal.fechaUsuario}</div>
                    <hr/>
                    <div className='alertViewInfo'>{animal.fasteners}</div>
                    <div className='alertViewInfo'>{!animal.chip ? 'No tiene chip' : 'Tiene chip'}</div>
                    <div className='alertViewInfo'>{!animal.idTag ? 'No lleva chapa' : 'Lleva chapa'}</div>
                    <div className='alertViewInfo'>{animal.name}</div>
            </div>
            <hr/>
            <div className='alertViewComments'>
                COMENTARIOS
            {noComments && <div className='noCommentsViewAnimal'>{noComments}</div>}
            {comments.map(comment => (
                    <div key={comment._id} className='alertViewOneComment'>
                        <div className='oneCommentInfo'>
                            <div>{comment.place}</div>
                            <div>{comment.fechaUsuario}</div>
                            <div>{comment.text}</div>
                        </div>
                    </div>
                ))}
                 {errorMessage && <div className='errorViewAnimal'>{errorMessage}</div>}
            </div>
        </div>
    )

}

export default AlertView;