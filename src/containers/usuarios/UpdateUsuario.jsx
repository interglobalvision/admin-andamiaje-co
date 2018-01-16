import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import UsuarioForm  from '../../components/usuarios/UsuarioForm.jsx';

const UpdateUsuario = ({ firebase, usuario, id }) => {

  if (!isLoaded(usuario)) { // If not loaded…
    return 'Loading'; // …show 'loading'
  } else if (isEmpty(usuario)) { // …else. If is empty…
    return 'Error'; // …show 'Error?'
  } else {
    return (
      <section>
        <header className='grid-row margin-bottom-basic'>
          <div className='grid-item'>
            <h1 className='font-size-large'>Editar Entrada</h1>
          </div>
        </header>

        <UsuarioForm id={id} usuario={usuario} />
      </section>
    );
  }
};

export default compose(
  // Get usuario path from firebase based on params prop (route params from react-router)
  firebaseConnect( ({ match: { params } }) => ([{
    path: `usuarios/${params.key}`, // connect with '/usuarios/:key'
    storeAs: 'usuario' // Store this data in `usuario` so it doesn't conflict with `usuarios`
  }])),
  // Map state to props
  connect(({ firebase: { data: { usuario } }}, { match }) => {
    return ({ // used to pass data from the redux store (state.fireabase) to the component as prop (usuarios)
      usuario,
      id: match.params.key,
    })
  })
)(UpdateUsuario);
