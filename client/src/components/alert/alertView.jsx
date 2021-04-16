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
        axios.get(`https://sosmascotas.herokuapp.com/animals/${props.match.params.id}`)
        .then(response => {
            setFormatDate(response.data.animal.fechaUsuario)
            setAnimal(response.data.animal)
        })
        .catch((err) => {
            setErrorMessage(err.response)
        })
      }, [props.match.params.id])

    
    useEffect(() => {
       
        axios.get("https://sosmascotas.herokuapp.com/comments/animal/" + props.match.params.id) 
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
                    <img src={`https://sosmascotas.herokuapp.com/storage/${animal.photo}`} alt="Foto" className='photoAlertView'/>
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
                        <table className='table table-hover'>
                            <thead>
                                <tr>
                                    <th colSpan='2'>INFORMACIÓN</th>
                                </tr>
                            </thead>
                        <tbody>
                        <tr>
                            <td className='bold'>Especie</td>
                            <td>{animal.species}</td>
                        </tr>
                        <tr>
                            <td className='bold'>Raza</td>
                            <td>{animal.breed}</td>
                        </tr>
                        <tr>
                            <td className='bold'>Color</td>
                            <td>{animal.colour}</td>
                        </tr>
                        <tr>
                            <td className='bold'>Sexo</td>
                            <td>{animal.sex}</td>
                        </tr>
                        <tr>
                            <td className='bold'>Lugar</td>
                            <td>{animal.place}</td>
                        </tr>
                        <tr>
                            <td className='bold'>Código Postal</td>
                            <td>{animal.cp}</td>
                        </tr>
                        <tr>
                            <td className='bold'>Fecha</td>
                            <td>{animalDate}</td>
                        </tr>
                        <tr>
                            <td className='bold'>Sujecciones</td>
                            <td>{animal.fasteners}</td>
                        </tr>
                        <tr>
                            <td className='bold'>Microchip</td>
                            <td>{!animal.chip ? 'No tiene chip / No lo se' : 'Tiene chip'}</td>
                        </tr>
                        <tr>
                            <td className='bold'>Chapa</td>
                            <td>{!animal.idTag ? 'No lleva chapa' : 'Lleva chapa'}</td>
                        </tr>
                        <tr>
                            <td className='bold'>Nombre</td>
                            <td>{animal.name}</td>
                        </tr>
                        </tbody>
                        </table>
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
                                    <div className='creatorUser'>{comment.creatorUser === null ? 'Este usuario ya no esta activo' : comment.creatorUser.name}</div>
                                    <div className='creatorUser'>{comment.creatorUser === null ? '' : comment.creatorUser.email}</div>
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