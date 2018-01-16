/* global confirm */
import React from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';

const ArtistasListItem = ({ artista, firebase: { remove } }) => {
  const { key } = artista;
  const { name, country, active } = artista.value;

  return(
    <div className='list-rows-item grid-row padding-top-micro padding-bottom-micro align-items-center'>
      <div className='grid-item item-s-3 item-m-4'>
        <span><Link className="link-underline" to={'/artistas/' + key}>{name}</Link></span>
      </div>
      <div className='grid-item item-s-3'>
        <span>{country}</span>
      </div>
      <div className='grid-item item-s-2'>
        <span>{active ? 'Activo' : 'Inactivo'}</span>
      </div>
      <div className='grid-item flex-grow grid-row no-gutter justify-end'>
        <div className='grid-item'>
          <Link className='font-bold' to={'/artistas/' + key}>Editar</Link>
        </div>
        <div className='grid-item'>
          <button className='u-pointer font-bold' onClick={() => window.confirm('¿Seguro que deseas eliminar esta noticia?') ? remove('artistas/' + key) : null}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}

export default withFirebase(ArtistasListItem);