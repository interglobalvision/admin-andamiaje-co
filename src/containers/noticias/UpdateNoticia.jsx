import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import NoticiaForm  from '../../components/noticias/NoticiaForm.jsx';

const UpdateNoticia = ({ firebase, noticia, id }) => {

  if (!isLoaded(noticia)) { // If not loaded…
    return 'Loading'; // …show 'loading'
  } else if (isEmpty(noticia)) { // …else. If is empty…
    return 'Error'; // …show 'Error?'
  } else {
    return (
      <section>
        <header className='grid-row margin-bottom-basic'>
          <div className='grid-item'>
            <h1 className='font-size-large'>Editar Noticia</h1>
          </div>
        </header>

        <NoticiaForm id={id} noticia={noticia} />
      </section>
    );
  }
};

export default compose(
  // Get noticia path from firebase based on params prop (route params from react-router)
  firebaseConnect( ({ match: { params } }) => ([{
    path: `noticias/${params.key}`, // connect with '/noticias/:key'
    storeAs: 'noticia' // Store this data in `noticia` so it doesn't conflict with `noticias`
  }])),
  // Map state to props
  connect(({ firebase: { data: { noticia } }}, { match }) => {
    return ({ // used to pass data from the redux store (state.fireabase) to the component as prop (noticias)
      noticia,
      id: match.params.key,
    })
  })
)(UpdateNoticia);
