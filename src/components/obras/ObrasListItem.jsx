/* global confirm */
import React from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';

const ObrasListItem = ({ obra, firebase: { remove } }) => {
  const { key } = obra;
  const { title, year, medium } = obra.value;

  return(
    <div className='list-rows-item grid-row padding-top-micro padding-bottom-micro align-items-center'>
      <div className='grid-item item-s-3 item-m-4'>
        <span><Link className="link-underline" to={'/obras/' + key}>{title}</Link></span>
      </div>
      <div className='grid-item item-s-3'>
        <span>{year}</span>
      </div>
      <div className='grid-item item-s-3'>
        <span>{medium}</span>
      </div>
      <div className='grid-item flex-grow grid-row no-gutter justify-end'>
        <div className='grid-item'>
          <Link className='font-bold' to={'/obras/' + key}>Editar</Link>
        </div>
        <div className='grid-item'>
          <button className='u-pointer font-bold' onClick={() => window.confirm('¿Seguro que deseas eliminar esta noticia?') ? remove('artistas/' + key) : null}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}

export default withFirebase(ObrasListItem);