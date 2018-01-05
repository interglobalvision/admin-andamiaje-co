import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firebaseConnect, isLoaded, isEmpty } from 'react-redux-firebase';

import NoticiasListItem from '../components/NoticiasListItem';

const Noticias = ({ firebase, noticias }) => {

  // Generate the list
  const noticiasList = !isLoaded(noticias) // If not loaded…
    ? 'Loading' // …show 'loading'
    : isEmpty(noticias) // …else. If is empty…
      ? 'No hay noticias que mostrar' // …show 'empty list'
    : Object.keys(noticias).map( // …else map thru noticias
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

      <div class="rows-list">
        {noticiasList}
      </div>

    </section>
  );
};

export default compose(
  firebaseConnect([ // used to retrive data from firebase. this puts the data in the redux store. Also passes a firebase instace as prop to the component
    'noticias', // connect with '/noticias'
  ]),
  connect((state) => ({ // used to pass data from the redux store (state.fireabase) to the component as prop (noticias)
    noticias: state.firebase.ordered.noticias,
  }))
)(Noticias);
