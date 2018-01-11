/* global confirm */
import React from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';

import moment from 'moment';

const NoticiasListItem = ({ noticia, firebase: { remove } }) => {
  const { key } = noticia;
  const { title, published, publishDate } = noticia.value;
  const publishDateDisplay = moment(publishDate).format('DD-MM-YYYY');

  return(
    <div className='list-rows-item grid-row padding-top-micro padding-bottom-micro align-items-center'>
      <div className='grid-item item-s-3 item-m-4 item-l-5'>
        <span><Link className="link-underline" to={'/noticias/' + key}>{title}</Link></span>
      </div>
      <div className='grid-item item-s-2'>
        <span>{published ? 'Publicado' : 'Borrador'}</span>
      </div>
      <div className='grid-item item-s-3 item-l-2'>
        <span>{publishDateDisplay}</span>
      </div>
      <div className='grid-item flex-grow grid-row no-gutter justify-end'>
        <div className='grid-item'>
          <Link className='font-bold' to={'/noticias/' + key}>Editar</Link>
        </div>
        <div className='grid-item'>
          <button className='u-pointer font-bold' onClick={() => window.confirm('¿Seguro que deseas eliminar esta noticia?') ? remove('noticias/' + key) : null}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}

export default withFirebase(NoticiasListItem);
