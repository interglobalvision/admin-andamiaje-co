import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import LoteForm from '../../components/lotes/LoteForm.jsx';

const UpdateLote = ({ firebase, lote, id }) => {

  if (!isLoaded(lote)) { // If not loaded…
    return 'Loading'; // …show 'loading'
  } else if (isEmpty(lote)) { // …else. If is empty…
    return 'Error'; // …show 'Error?'
  } else {
    return (
      <section>
        <header className='grid-row margin-bottom-basic'>
          <div className='grid-item'>
            <h1 className='font-size-large'>Editar Entrada</h1>
          </div>
        </header>

        <LoteForm id={id} lote={lote} />
      </section>
    );
  }
};

export default compose(
  // Get noticia path from firebase based on params prop (route params from react-router)
  firebaseConnect( ({ match: { params } }) => ([{
    path: `lotes/${params.key}`, // connect with '/noticias/:key'
    storeAs: 'lote' // Store this data in `noticia` so it doesn't conflict with `noticias`
  }])),
  // Map state to props
  connect(({ firebase: { data: { lote } }}, { match }) => {
    return ({ // used to pass data from the redux store (state.fireabase) to the component as prop (noticias)
      lote,
      id: match.params.key,
    })
  })
)(UpdateLote);
