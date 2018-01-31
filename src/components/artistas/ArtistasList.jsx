import React from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';

import ArtistasListItem from '../../components/artistas/ArtistasListItem';

const ArtistasList = ({ artistas }) => {
  if (!isLoaded(artistas)) { // If not loaded…
    return 'Loading'; // …show 'loading'
  } else if (isEmpty(artistas)) { // …else. If is empty…
    return 'No hay artistas que mostrar'; // …show 'empty list'
  } else {
    return (
      <section className="margin-bottom-basic">
        <header className='grid-row margin-bottom-tiny font-size-small font-bold'>
          <div className='grid-item item-s-3 item-m-4'>
            <h3>Nombre</h3>
          </div>
          <div className='grid-item item-s-3'>
            <h3>País</h3>
          </div>
          <div className='grid-item item-s-3'>
            <h3>Estado</h3>
          </div>
        </header>

        <div className="list-rows-holder">
          { Object.keys(artistas).map( // …else map thru noticias
            (key, id) => <ArtistasListItem key={key} id={id} artista={artistas[key]} />
          ) }
        </div>
      </section>
    );
  }

};

export default ArtistasList;
