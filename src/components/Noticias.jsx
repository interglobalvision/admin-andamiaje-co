import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import NoticiasListItem from './NoticiasListItem';

const Noticias = ({ firebase, noticias }) => {
  const noticiasList = !isLoaded(noticias)
    ? 'Loading'
    : isEmpty(noticias)
      ? 'No hay noticias que mostrar'
      : Object.keys(noticias).map(
        (key, id) => <NoticiasListItem key={key} id={id} noticia={noticias[key]} />
      )

  return (
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

      <div className='grid-row'>
        <div className='grid-item item-s-4'>
          <h3>Título</h3>
        </div>
        <div className='grid-item item-s-1'>
          <h3>Estado</h3>
        </div>
      </div>

      {noticiasList}

    </section>
  );
};

export default compose(
  firebaseConnect([
    'noticias',
  ]),
  connect((state) => ({
      noticias: state.firebase.ordered.noticias,
    })
  )
)(Noticias);
