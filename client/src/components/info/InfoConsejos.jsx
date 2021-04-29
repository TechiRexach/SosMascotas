import './info.css';

function InfoConsejos(){
    return( 
        <div className='form-control consejos'>
            <p className='alert alert-secondary'>Consejos</p>
            <p>Perdidos:</p>
            <ol className='tablaConsejos'>
                <li>Lleva siempre a tu animal identificado, tanto con microchip, como con una chapa con tus datos, siempre que sea posible.</li>
                <li>Haz carteles con todos sus datos y una fotografía lo más reciente posible. Pégalos por la zona donde se ha perdido y ve ampliando el radio de búsqueda.</li>
                <li>Denuncia en el RIAC y en la Policia su desaparición.</li>
                <li>Publícalo en todas tus redes sociales y pide a amigos y familiares que lo compartan.</li>
                <li>Avisa en todos los veterinarios de la zona, no tendrán problema en colgar uno de los carteles en sus clínicas.</li>
                <li>Llama y visita las páginas web de las protectoras, puede estar allí si alguien lo ha encontrado.</li>
            </ol>
            <hr/>
            <p>Encontrados:</p>
            <ol className='tablaConsejos'>
                <li>Si lo has podido coger, llévalo a un veterinario para que miren si tiene microchip. Si tiene, se pondrán en contacto con su familia.</li>
                <li>Si lleva chapa, intenta ponerte en contacto con el teléfono que lleve escrito.</li>
                <li>Haz carteles con todos los datos que puedas, una fotografía y tu número de teléfono. Pégalos por la zona donde lo encontraste por si alguien lo reconoce.</li>
                <li>Publícalo en todas tus redes sociales y pide a amigos y familiares que lo compartan.</li>
                <li>Avisa en todos los veterinarios de la zona, puede ser uno de sus pacientes.</li>
                <li>Si no localizas a su familia, habla con las protectoras. Si tienen hueco, podrán llevarlo a su albergue, pero les facilitarás el trabajo si te conviertes en su casa de acogida hasta que encuentren una nueva familia para él.</li>
            </ol>
        </div>
    );
};

export default InfoConsejos;
