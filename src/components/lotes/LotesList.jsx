import React from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';

import LotesListItem from '../../components/lotes/LotesListItem';

const LotesList = ({ lotes }) => {
  if (!isLoaded(lotes)) { // If not loaded…
    return 'Loading'; // …show 'loading'
  } else if (isEmpty(lotes)) { // …else. If is empty…
    return 'No hay lotes que mostrar'; // …show 'empty list'
  } else {
    return (
      <section>
        <header className='grid-row margin-bottom-tiny font-size-small font-bold'>
          <div className='grid-item item-s-3 item-m-4'>
            <h3>Title</h3>
          </div>
          <div className='grid-item item-s-3'>
            <h3>Year</h3>
          </div>
          <div className='grid-item item-s-3'>
            <h3>Medium</h3>
          </div>
        </header>

        <div className="list-rows-holder">
          { Object.keys(lotes).map( // …else map thru noticias
            (key, id) => <LotesListItem key={key} id={id} lotes={lotes[key]} />
          ) }
        </div>
      </section>
    );
  }

};

export default LotesList;