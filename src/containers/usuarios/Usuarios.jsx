import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';

import UsuariosList from '../../components/usuarios/UsuariosList';

const Usuarios = ({ usuarios }) => (
  <section>

    <header className='grid-row margin-bottom-basic'>
      <div className='grid-item'>
        <h1 className='font-size-large'>Usuarios</h1>
      </div>
    </header>

    <div className='grid-row margin-bottom-basic justify-end'>
      <div className='grid-item'>
        <Link className='button' to='/usuarios/add'>Añadir Usuario</Link>
      </div>
    </div>

    <UsuariosList usuarios={usuarios} />

  </section>
);

export default compose(
  // Get usuario path from firebase based on params prop (route params from react-router)
  firebaseConnect([
    'usuarios',
  ]),
  // Map state to props
  // firebase = state.firebase
  // ordered = state.firebase.ordered
  connect(({ firebase: { ordered } }) => {
    return ({
      usuarios: ordered.usuarios,
    })
  })
)(Usuarios);
