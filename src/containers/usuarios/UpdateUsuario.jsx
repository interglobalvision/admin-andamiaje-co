import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import UsuarioForm from '../../components/usuarios/UsuarioForm.jsx';

const UpdateUsuario = ({ firebase, user, id, currentUID }) => {

  if (!isLoaded(user)) { // If not loaded…
    return 'Loading'; // …show 'loading'
  } else if (isEmpty(user)) { // …else. If is empty…
    return 'Error'; // …show 'Error?'
  } else {
    return (
      <section>
        <header className='grid-row margin-bottom-basic'>
          <div className='grid-item'>
            <h1 className='font-size-large'>Editar Usuario</h1>
          </div>
        </header>

        <UsuarioForm id={id} usuario={user} currentUID={currentUID} />
      </section>
    );
  }
};

export default compose(
  // Get usuario path from firebase based on params prop (route params from react-router)
  firebaseConnect( ({ match: { params } }) => ([{
    path: `users/${params.key}`, // connect with '/users/:key'
    storeAs: 'user' // Store this data in `user` so it doesn't conflict with `users`
  }])),
  // Map state to props
  connect(({ firebase }, { match }) => {
    return ({ // used to pass data from the redux store (state.firebase) to the component as prop (users)
      user: firebase.data.user,
      id: match.params.key,
      currentUID: firebase.auth.uid,
    })
  })
)(UpdateUsuario);
