import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import ObraForm from '../../components/obras/ObraForm.jsx';

const UpdateObra = ({ firebase, obra, id }) => {

  if (!isLoaded(obra)) { // If not loaded…
    return 'Loading'; // …show 'loading'
  } else if (isEmpty(obra)) { // …else. If is empty…
    return 'Error'; // …show 'Error?'
  } else {
    return (
      <section>
        <header className='grid-row margin-bottom-basic'>
          <div className='grid-item'>
            <h1 className='font-size-large'>Editar Entrada</h1>
          </div>
        </header>

        <ObraForm id={id} obra={obra} />
      </section>
    );
  }
};

export default compose(
  // Get noticia path from firebase based on params prop (route params from react-router)
  firebaseConnect( ({ match: { params } }) => ([{
    path: `obras/${params.key}`, // connect with '/noticias/:key'
    storeAs: 'obra' // Store this data in `noticia` so it doesn't conflict with `noticias`
  }])),
  // Map state to props
  connect(({ firebase: { data: { obra } }}, { match }) => {
    return ({ // used to pass data from the redux store (state.fireabase) to the component as prop (noticias)
      obra,
      id: match.params.key,
    })
  })
)(UpdateObra);
