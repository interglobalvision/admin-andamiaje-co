import React from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';

import NoticiasListItem from '../components/NoticiasListItem';

const NoticiasList = ({ noticias }) => {
  if (!isLoaded(noticias)) { // If not loaded…
    return 'Loading'; // …show 'loading'
  } else if (isEmpty(noticias)) { // …else. If is empty…
    return 'No hay noticias que mostrar'; // …show 'empty list'
  } else {
    return (
      <section>
        <header className='grid-row'>
          <div className='grid-item item-s-4'>
            <h3>Título</h3>
          </div>
          <div className='grid-item item-s-1'>
            <h3>Estado</h3>
          </div>
        </header>

        <div className="rows-list">
          { Object.keys(noticias).map( // …else map thru noticias
            (key, id) => <NoticiasListItem key={key} id={id} noticia={noticias[key]} />
          ) }
        </div>
      </section>
    );
  }

};

export default withRouter(NoticiasList);
