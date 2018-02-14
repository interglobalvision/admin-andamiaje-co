import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';
import { setIsLoading, setIsLoaded } from '../../redux/actions/loadingStatusActions'

import NoticiasList from '../../components/noticias/NoticiasList';

const Noticias = ({ noticias, setIsLoading, setIsLoaded }) => (
  <section>

    <header className='grid-row margin-bottom-basic'>
      <div className='grid-item'>
        <h1 className='font-size-large'>Noticias</h1>
      </div>
    </header>

    <div className='grid-row margin-bottom-basic justify-end'>
      <div className='grid-item'>
        <Link className='button' to='/noticias/add'>Añadir Entrada</Link>
      </div>
    </div>

    <NoticiasList noticias={noticias} setIsLoading={setIsLoading} setIsLoaded={setIsLoaded}/>

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
  }),
  {
    setIsLoading,
    setIsLoaded,
  }
)(Noticias);
