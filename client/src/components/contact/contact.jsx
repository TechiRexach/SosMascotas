import './contact.css';
import NavBar from '../general/Navbar.jsx'

function Contact(){

    return(
        <div>
            <NavBar />
        <form className='contacto'>
            <input className='inputEmailContact' type="email" placeholder='Email:'/>
            <textarea className='inputTextContact' placeholder='Texto:'/>
            <button className='buttonContact' type='submit'>Enviar</button>
        </form>
        </div>
    )
}

export default Contact;