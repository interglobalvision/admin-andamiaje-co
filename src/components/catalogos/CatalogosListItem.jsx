import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';
import { toastr } from 'react-redux-toastr';

import { ToastrOptionsConfirm, ToastrOptionsSuccess } from '../../utilities/toastr.js';

const CatalogosListItem = ({ catalogo, firebase }) => {
  const { key } = catalogo;
  const { title, medium } = catalogo.value;

  const removeCatalogo = (key) => {

    firebase.remove('catalogos/' + key)
    .then(() => {

      // Display success toast
      toastr.success('Éxito', 'Catálogo eliminado', ToastrOptionsSuccess);

    });
  };

  return(
    <div className='list-rows-item grid-row padding-top-micro padding-bottom-micro align-items-center'>
      <div className='grid-item item-s-3 item-m-4'>
        <span><Link className="link-underline" to={'/catalogos/' + key}>{title}</Link></span>
      </div>
      <div className='grid-item flex-grow grid-row no-gutter justify-end'>
        <div className='grid-item'>
          <Link className='font-bold' to={'/catalogos/' + key}>Editar</Link>
        </div>
        <div className='grid-item'>
          <button type='button' className='u-pointer font-bold' onClick={() => toastr.confirm('¿Seguro que deseas eliminar este catalogo?', ToastrOptionsConfirm(removeCatalogo, key))}>Eliminar</button>
        </div>
      </div>
    </div>
  );
}

CatalogosListItem.propTypes = {
  catalogo: PropTypes.shape({
    key: PropTypes.string.isRequired,
    value: PropTypes.shape({
      title: PropTypes.string,
      //TODO: medium.PropTypes.array,
    }).isRequired,
  }),
};

export default withFirebase(CatalogosListItem);
