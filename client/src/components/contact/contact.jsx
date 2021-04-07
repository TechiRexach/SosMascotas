import './contact.css';

function Contact(){

    return(
        <form className='contacto'>
            <input className='inputEmailContact' type="email" placeholder='Email:'/>
            <textarea className='inputTextContact' placeholder='Texto:'/>
            <button className='buttonContact' type='submit'>Enviar</button>
        </form>
    )
}

export default Contact;