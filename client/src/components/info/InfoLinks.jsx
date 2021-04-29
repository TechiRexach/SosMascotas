import './info.css';

function InfoLinks(){
    return(
        <div className='form-control links'>
            <p className='alert alert-secondary'>Enlaces de Interés</p>
            <ul className='tablaLinks'>
                <li><a href='https://www.policia.es/_es/denuncias.php'>Policia Nacional</a></li>
                <li><a href='https://regiac.xunta.gal/'>REGIAC - Galicia</a></li>
                <li><a href='http://www.colegioveterinarios.net/'>RIAPA - Asturias</a></li>
                <li><a href='https://racic.cantabria.es/racic/'>RACIC - Cantabria</a></li>
                <li><a href='http://www.nekanet.net/censocanino/default.asp'>REGIA - País Vasco</a></li>
                <li><a href='https://administracionelectronica.navarra.es/CensoCaninoWeb/frm/index.aspx'>REIAC - Navarra</a></li>
                <li><a href='http://www.larioja.org/riac'>RIAC - La Rioja</a></li>
                <li><a href='http://www.riaca.org/'>RIACA - Aragón</a></li>
                <li><a href='http://www.veterinaris.cat/'>CCVC - Cataluña</a></li>
                <li><a href='http://www.siacyl.org'> SIACYL - Castilla y León</a></li>
                <li><a href='https://www.colvema.org/riac.asp'>RIAC - Madrid</a></li>
                <li><a href='http://www.siiaclm.org/'>SIIA-CLM - Castilla La Mancha</a></li>
                <li><a href='https://www.rivia.org/'>RIVIA - Valencia</a></li>
                <li><a href='http://www.riacib.org/'>RIACIB - Islas Baleares</a></li>
                <li><a href='http://www.riace.es/'>RIACE - Extremadura</a></li>
                <li><a href='https://www.raia.es/'>RAIA - Andalucía</a></li>
                <li><a href='http://www.siamu.org/'>SIAMU - Murcia</a></li>
                <li><a href='http://www.zoocan.net'>ZOOCAN - Canarias</a></li>
                <li><a href='http://www.siace.org/'>SIACE - Ceuta</a></li>
                <li><a href='http://www.siamel.org/'>SIAMEL - Melilla</a></li>
            </ul>
        </div>
    );
};

export default InfoLinks;
