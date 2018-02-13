import React from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';

import ObrasListItem from '../../components/obras/ObrasListItem';

const ObrasList = ({ obras }) => {
  if (!isLoaded(obras)) { // If not loaded…
    return 'Loading'; // …show 'loading'
  } else if (isEmpty(obras)) { // …else. If is empty…
    return 'No hay obras que mostrar'; // …show 'empty list'
  } else {
    return (
      <section className="margin-bottom-basic">
        <header className='grid-row margin-bottom-tiny font-size-small font-bold'>
          <div className='grid-item item-s-1'>
            <h3>Imagen</h3>
          </div>
          <div className='grid-item item-s-3 item-m-4'>
            <h3>Título</h3>
          </div>
          <div className='grid-item item-s-2'>
            <h3>Año</h3>
          </div>
          <div className='grid-item item-s-2'>
            <h3>Artista</h3>
          </div>
        </header>

        <div className="list-rows-holder">
          { Object.keys(obras).map( // …else map thru noticias
            (key, id) => <ObrasListItem key={key} id={id} obra={obras[key]} />
          ) }
        </div>
      </section>
    );
  }

};

export default ObrasList;
