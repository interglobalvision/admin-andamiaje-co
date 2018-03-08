import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';
import { toastr } from 'react-redux-toastr';

import { ToastrOptionsConfirm, ToastrOptionsSuccess } from '../../utilities/toastr.js';

const LotesListItem = ({ lote, firebase, wishlists }) => {
  const { key } = lote;
  const { title, price, artista } = lote.value;

  const removeLote = (key) => {

    firebase.remove('lotes/' + key)
    .then(() => {

      // Display success toast
      toastr.success('Éxito', 'Lote eliminado', ToastrOptionsSuccess);

    });
  };

  return(
    <div className='list-rows-item grid-row padding-top-micro padding-bottom-micro align-items-center'>
      <div className='grid-item item-s-3 item-m-4'>
        <span><Link className="link-underline" to={'/lotes/' + key}>{title}</Link></span>
      </div>
      <div className='grid-item item-s-3'>
        <span>{artista.name}</span>
      </div>
      <div className='grid-item item-s-1'>
        <span>{price}</span>
      </div>
      <div className='grid-item item-s-1'>
        <span>{wishlists}</span>
      </div>
      <div className='grid-item flex-grow grid-row no-gutter justify-end'>
        <div className='grid-item'>
          <Link className='font-bold' to={'/lotes/' + key}>Editar</Link>
        </div>
        <div className='grid-item'>
          <button type='button' className='u-pointer font-bold' onClick={() => toastr.confirm('¿Seguro que deseas eliminar este lote?', ToastrOptionsConfirm(removeLote, key))}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}

LotesListItem.propTypes = {
  lote: PropTypes.shape({
    key: PropTypes.string.isRequired,
    value: PropTypes.shape({
      title: PropTypes.string,
      year: PropTypes.number,
      //TODO: medium.PropTypes.array,
    }).isRequired,
  }),
  wishlists: PropTypes.number.isRequired,
};

export default withFirebase(LotesListItem);
