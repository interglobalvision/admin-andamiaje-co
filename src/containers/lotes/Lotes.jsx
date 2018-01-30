import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';

import LotesList from '../../components/lotes/LotesList';

const Lotes = ({ lotes }) => (
  <section>

    <header className='grid-row margin-bottom-basic'>
      <div className='grid-item'>
        <h1 className='font-size-large'>Lotes</h1>
      </div>
    </header>

    <div className='grid-row margin-bottom-basic justify-end'>
      <div className='grid-item'>
        <Link className='button' to='/lotes/add'>Añadir Entrada</Link>
      </div>
    </div>

    <LotesList lotes={lotes} />

  </section>
);

export default compose(
  // Get lote path from firebase based on params prop (route params from react-router)
  firebaseConnect([
    'lotes',
  ]),
  // Map state to props
  // firebase = state.firebase
  // ordered = state.firebase.ordered
  connect(({ firebase: { ordered } }) => {
    return ({
      lotes: ordered.lotes,
    })
  })
)(Lotes);
