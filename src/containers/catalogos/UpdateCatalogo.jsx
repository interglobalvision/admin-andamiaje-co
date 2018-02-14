import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import CatalogoForm from '../../components/catalogos/CatalogoForm.jsx';

const UpdateCatalogo = ({ firebase, catalogo, id, dispatch }) => {

  if (!isLoaded(catalogo)) { // If not loaded…
    return 'Loading'; // …show 'loading'
  } else if (isEmpty(catalogo)) { // …else. If is empty…
    return 'Error'; // …show 'Error?'
  } else {
    return (
      <section>
        <header className='grid-row margin-bottom-basic'>
          <div className='grid-item'>
            <h1 className='font-size-large'>Editar Catalogo</h1>
          </div>
        </header>

        <CatalogoForm id={id} catalogo={catalogo} dispatch={dispatch} />
      </section>
    );
  }
};

export default compose(
  // Get noticia path from firebase based on params prop (route params from react-router)
  firebaseConnect( ({ match: { params } }) => ([{
    path: `catalogos/${params.key}`, // connect with '/noticias/:key'
    storeAs: 'catalogo' // Store this data in `noticia` so it doesn't conflict with `noticias`
  }])),
  // Map state to props
  connect(({ firebase: { data: { catalogo } }}, { match }) => {
    return ({ // used to pass data from the redux store (state.fireabase) to the component as prop (noticias)
      catalogo,
      id: match.params.key,
    })
  })
)(UpdateCatalogo);
