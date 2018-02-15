import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';

import CatalogosList from '../../components/catalogos/CatalogosList';

const Catalogos = ({ catalogos, lotes }) => (
  <section>

    <header className='grid-row margin-bottom-basic'>
      <div className='grid-item'>
        <h1 className='font-size-large'>Catálogos</h1>
      </div>
    </header>

    <div className='grid-row margin-bottom-basic justify-end'>
      <div className='grid-item'>
        {lotes !== undefined && lotes !== null ? (
          <Link className='button' to='/catalogos/add'>Añadir Catalogo</Link>
        ) : (
          <div>Es necesario crear Lotes</div>
        )}
      </div>
    </div>

    <CatalogosList catalogos={catalogos} />

  </section>
);

export default compose(
  // Get catalogo path from firebase based on params prop (route params from react-router)
  firebaseConnect([
    'catalogos', 'lotes',
  ]),
  // Map state to props
  // firebase = state.firebase
  // ordered = state.firebase.ordered
  connect(({ firebase: { ordered } }) => {
    return ({
      catalogos: ordered.catalogos,
      lotes: ordered.lotes,
    })
  })
)(Catalogos);
