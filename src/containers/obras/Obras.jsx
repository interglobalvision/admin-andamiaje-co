import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';

import ObrasList from '../../components/obras/ObrasList';

const Obras = ({ obras }) => (
  <section>

    <header className='grid-row margin-bottom-basic'>
      <div className='grid-item'>
        <h1 className='font-size-large'>Obras</h1>
      </div>
    </header>

    <div className='grid-row margin-bottom-basic justify-end'>
      <div className='grid-item'>
        <Link className='button' to='/obras/add'>Añadir Noticia</Link>
      </div>
    </div>

    <ObrasList obras={obras} />

  </section>
);

export default compose(
  // Get noticia path from firebase based on params prop (route params from react-router)
  firebaseConnect([
    'obras',
  ]),
  // Map state to props
  // firebase = state.firebase
  // ordered = state.firebase.ordered
  connect(({ firebase: { ordered } }) => {
    return ({
      obras: ordered.obras,
    })
  })
)(Obras);
