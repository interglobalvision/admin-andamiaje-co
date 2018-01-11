import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';

import NoticiasList from '../components/NoticiasList';

const Noticias = ({ noticias }) => (
  <section>

    <header className='grid-row margin-bottom-basic'>
      <div className='grid-item flex-grow'>
        <h1 className='font-size-large'>Noticias</h1>
      </div>
      <div className='grid-item'>
        <Link className='button' to='/noticias/add'>Añadir Entrada</Link>
      </div>
    </header>

    <NoticiasList noticias={noticias} />

  </section>
);

export default compose(
  // Get noticia path from firebase based on params prop (route params from react-router)
  firebaseConnect([
    'noticias',
  ]),
  // Map state to props
  // firebase = state.firebase
  // ordered = state.firebase.ordered
  connect(({ firebase: { ordered } }) => {
    return ({
      noticias: ordered.noticias,
    })
  })
)(Noticias);
