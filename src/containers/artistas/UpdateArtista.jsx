import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import ArtistaForm from '../../components/artistas/ArtistaForm.jsx';

const UpdateArtista = ({ firebase, artista, id }) => {

  if (!isLoaded(artista)) { // If not loaded…
    return 'Loading'; // …show 'loading'
  } else if (isEmpty(artista)) { // …else. If is empty…
    return 'Error'; // …show 'Error?'
  } else {
    return (
      <section>
        <header className='grid-row margin-bottom-basic'>
          <div className='grid-item'>
            <h1 className='font-size-large'>Editar Artista</h1>
          </div>
        </header>

        <ArtistaForm id={id} artista={artista} />
      </section>
    );
  }
};

export default compose(
  // Get noticia path from firebase based on params prop (route params from react-router)
  firebaseConnect( ({ match: { params } }) => ([{
    path: `artistas/${params.key}`, // connect with '/noticias/:key'
    storeAs: 'artista' // Store this data in `noticia` so it doesn't conflict with `noticias`
  }])),
  // Map state to props
  connect(({ firebase: { data: { artista } }}, { match }) => {
    return ({ // used to pass data from the redux store (state.fireabase) to the component as prop (noticias)
      artista,
      id: match.params.key,
    })
  })
)(UpdateArtista);
