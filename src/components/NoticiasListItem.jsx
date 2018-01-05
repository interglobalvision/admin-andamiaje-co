/* global confirm */
import React from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';

const NoticiasListItem = ({ noticia, firebase: { remove } }) => {
  const { key } = noticia;
  const { title, published } = noticia.value;

  return(
    <div className='grid-row'>
      <div className='grid-item item-s-4'>
        <h3><Link to={'/noticias/' + key}>{title}</Link></h3>
      </div>
      <div className='grid-item item-s-1'>
        <h3>{published ? 'Publicado' : 'Borrador'}</h3>
      </div>
      <div className='grid-item item-s-1 offset-s-5'>
        <p><Link to={'/noticias/' + key}>Editar</Link></p>
      </div>
      <div className='grid-item item-s-1'>
        <button onClick={() => window.confirm('¿Seguro que deseas eliminar esta noticia?') ? remove('noticias/' + key) : null}>Eliminar</button>
      </div>
    </div>
  );
}

export default withFirebase(NoticiasListItem);
