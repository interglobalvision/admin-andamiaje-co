import React from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';

import NoticiasListItem from '../components/NoticiasListItem';

const NoticiasList = ({ noticias }) => {
  if (!isLoaded(noticias)) { // If not loaded…
    return 'Loading'; // …show 'loading'
  } else if (isEmpty(noticias)) { // …else. If is empty…
    return 'No hay noticias que mostrar'; // …show 'empty list'
  } else {
    return (
      <section>
        <header className='grid-row margin-bottom-tiny font-size-small font-bold'>
          <div className='grid-item item-s-3 item-m-4 item-l-5'>
            <h3>Título</h3>
          </div>
          <div className='grid-item item-s-2'>
            <h3>Estado</h3>
          </div>
          <div className='grid-item item-s-3 item-l-2'>
            <h3>Fecha</h3>
          </div>
        </header>

        <div className="list-rows-holder">
          { Object.keys(noticias).map( // …else map thru noticias
            (key, id) => <NoticiasListItem key={key} id={id} noticia={noticias[key]} />
          ) }
        </div>
      </section>
    );
  }

};

export default NoticiasList;
