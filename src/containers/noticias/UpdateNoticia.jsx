import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';
import { setIsLoading, setIsLoaded } from '../../redux/actions/loadingStatusActions'

import NoticiaForm  from '../../components/noticias/NoticiaForm.jsx';

const UpdateNoticia = ({ firebase, noticia, id, setIsLoading, setIsLoaded }) => {

  if (!isLoaded(noticia)) { // If not loaded…
    return 'Loading'; // …show 'loading'
  } else if (isEmpty(noticia)) { // …else. If is empty…
    return 'Error'; // …show 'Error?'
  } else {
    return (
      <section>
        <header className='grid-row margin-bottom-basic'>
          <div className='grid-item'>
            <h1 className='font-size-large'>Editar Entrada</h1>
          </div>
        </header>

        <NoticiaForm id={id} noticia={noticia} setIsLoading={setIsLoading} setIsLoaded={setIsLoaded}/>
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
  }),
  {
    setIsLoading,
    setIsLoaded,
  }
)(UpdateNoticia);
