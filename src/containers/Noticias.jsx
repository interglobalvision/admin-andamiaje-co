import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';

import NoticiasList from '../components/NoticiasList';

const Noticias = ({ firebase, noticias }) => (
  <section>

    <div className='grid-row'>
      <div className='grid-item item-s-3'>
        <h2>Noticias</h2>
      </div>
    </div>

    <div className='grid-row justify-end'>
      <div className='grid-item item-s-2'>
        <Link to='/noticias/add'>Añadir Entrada</Link>
      </div>
    </div>

    <NoticiasList noticias={noticias} />

  </section>
);

export default compose(
  // Get noticia path from firebase based on params prop (route params from react-router)
  firebaseConnect([
    'noticias',
  ]),
  // Map state to props
  connect(({ firebase: { ordered } }) => {
    return ({
      noticias: ordered.noticias,
    })
  })
)(Noticias);
