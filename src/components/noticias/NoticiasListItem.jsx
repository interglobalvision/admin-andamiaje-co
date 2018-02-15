/* global confirm */
import React from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';
import { toastr } from 'react-redux-toastr';

import moment from 'moment';

import { ToastrOptionsConfirm, ToastrOptionsSuccess } from '../../utilities/toastr.js';
import { getResizedImageUrl } from '../../utilities/images.js';

const NoticiasListItem = ({ noticia, firebase }) => {
  const { key } = noticia;
  const { title, published, publishDate, images } = noticia.value;
  const publishDateDisplay = moment(publishDate).format('DD-MM-YYYY');

  let imageUrl = undefined;

  if(images !== undefined) {
    imageUrl = getResizedImageUrl(images[0], '350', true);
  }

  const removeNoticia = (key) => {

    firebase.remove('noticias/' + key)
    .then(() => {

      // Display success toast
      toastr.success('Éxito', 'Noticia eliminada', ToastrOptionsSuccess);

    });
  };

  return(
    <div className='list-rows-item grid-row padding-top-micro padding-bottom-micro align-items-center'>
      <div className='grid-item item-s-1'>
        { imageUrl !== undefined ? <img src={imageUrl} alt={title} /> : '' }
      </div>
      <div className='grid-item item-s-3 item-m-4'>
        <span><Link className="link-underline" to={'/noticias/' + key}>{title}</Link></span>
      </div>
      <div className='grid-item item-s-2'>
        <span>{published ? 'Publicado' : 'Borrador'}</span>
      </div>
      <div className='grid-item item-s-2'>
        <span>{publishDateDisplay}</span>
      </div>
      <div className='grid-item flex-grow grid-row no-gutter justify-end'>
        <div className='grid-item'>
          <Link className='font-bold' to={'/noticias/' + key}>Editar</Link>
        </div>
        <div className='grid-item'>
          <button type='button' className='u-pointer font-bold' onClick={() => toastr.confirm('¿Seguro que deseas eliminar esta noticia?', ToastrOptionsConfirm(removeNoticia, key))}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}

export default withFirebase(NoticiasListItem);
