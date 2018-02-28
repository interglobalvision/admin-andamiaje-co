/* global confirm */
import React from 'react';
import { Link } from 'react-router-dom';
import { withFirebase } from 'react-redux-firebase';
import { toastr } from 'react-redux-toastr';

import axios from 'axios';

import { CloudFunctionsUrl } from '../../utilities/constants.js'

import { ToastrOptionsError, ToastrOptionsConfirm, ToastrOptionsSuccess } from '../../utilities/toastr.js';

const UsuariosListItem = ({ usuario, firebase, currentUID }) => {
  const { key } = usuario;
  const { name, role, active } = usuario.value;

  let displayRole;

  switch (role) {
    case 'admin':
      displayRole = 'Admin';
      break;
    case 'artist':
      displayRole = 'Artista';
      break;
    case 'member':
      displayRole = 'Miembro';
      break;
    case 'observer':
      displayRole = 'Observador';
      break;
    default:
      displayRole = '';
      break;
  }

  const removeUser = (key) => {
    const deleteUserFunction = CloudFunctionsUrl + '/deleteUser';

    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
    .then(idToken => {
      axios.get(deleteUserFunction, {
        params: {
          uid: key,
        },
      	headers: {
          'Access-Control-Allow-Origin': '*',
          'Authorization': idToken,
      	},
        mode: 'no-cors'
      })
    }).then((response) => {
      console.log(response);

      firebase.remove('users/' + key);

    }).then(() => {

      // Display success toast
      toastr.success('Éxito', 'Usuario eliminado', ToastrOptionsSuccess);

    }).catch(error => {
      // Error handling
      if (error.response) {
        console.log(error.response.data);

        // Display error toast
        toastr.error('Error', error.response.data.message, ToastrOptionsError);
      }
    });
  };

  return(
    <div className='list-rows-item grid-row padding-top-micro padding-bottom-micro align-items-center'>
      <div className='grid-item item-s-3 item-m-4 item-l-5'>
        <span><Link className="link-underline" to={'/usuarios/' + key}>{name}</Link></span>
      </div>
      <div className='grid-item item-s-2'>
        <span>{displayRole}</span>
      </div>
      <div className='grid-item item-s-2'>
        <span>{active ? 'Activo' : 'Inactivo'}</span>
      </div>
      <div className='grid-item flex-grow grid-row no-gutter justify-end'>
        <div className='grid-item'>
          <Link className='font-bold' to={'/usuarios/' + key}>Editar</Link>
        </div>
        <div className='grid-item'>
          <button
            type='button'
            className={key === currentUID ? '' : 'u-pointer font-bold'}
            onClick={() => toastr.confirm('¿Seguro que deseas eliminar este usuario?', ToastrOptionsConfirm(removeUser, key))}
            disabled={key === currentUID}
          >Eliminar</button>
        </div>
      </div>
    </div>
  );
}

export default withFirebase(UsuariosListItem);
