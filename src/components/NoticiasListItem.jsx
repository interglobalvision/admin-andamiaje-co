/* global confirm */
import React from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';

const NoticiasListItem = ({ noticia, firebase: { remove } }) => {
  const { key } = noticia;
  const { title, published } = noticia.value;

  return(
    <div className='grid-row padding-top-micro padding-bottom-micro align-items-center'>
      <div className='grid-item item-s-4'>
        <span><Link to={'/noticias/' + key}>{title}</Link></span>
      </div>
      <div className='grid-item item-s-1'>
        <span>{published ? 'Publicado' : 'Borrador'}</span>
      </div>
      <div className='grid-item item-s-1 offset-s-5'>
        <Link to={'/noticias/' + key}>Editar</Link>
      </div>
      <div className='grid-item item-s-1'>
        <button onClick={() => window.confirm('¿Seguro que deseas eliminar esta noticia?') ? remove('noticias/' + key) : null}>Eliminar</button>
      </div>
    </div>
  );
}

export default withFirebase(NoticiasListItem);
