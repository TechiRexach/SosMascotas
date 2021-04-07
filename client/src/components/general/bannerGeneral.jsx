import './bannerGeneral.css';
import { useState } from 'react';

function BannerGeneral(){

    const [banners, setBanner] = useState([
        // {id: 1, banner: 'HOME'},
        {id: 2, banner: 'PERDIDOS'},
        // {id: 3, banner: 'ENCONTRADO'},
        // {id: 4, banner: 'EN CASA'},
        // {id: 5, banner: 'INFORMACION'},
        // {id: 6, banner: 'PERFIL'},
        // {id: 7, banner: 'CONTACTO'},
        // {id: 8, banner: 'REGISTRO'},
        // {id: 9, banner: 'ACCESO'},
        // {id: 10, banner: 'AVISO'},
        // {id: 11, banner: 'CREAR / MODIFICAR AVISO'},
        // {id: 12, banner: 'CREAR COMENTARIO'},
      ]);

    return(
        <div className='bannerGeneral'>
            {banners.map(item => 
            <div>{item.banner}</div>
            )}
        </div>
    );
};

export default BannerGeneral;