import React from 'react';
import PropTypes from 'prop-types';

import { isLoaded, isEmpty } from 'react-redux-firebase';

import LotesListItem from '../../components/lotes/LotesListItem';

const LotesList = ({ lotes }) => {
  if (!isLoaded(lotes)) { // If not loaded…
    return 'Loading'; // …show 'loading'
  } else if (isEmpty(lotes)) { // …else. If is empty…
    return 'No hay lotes que mostrar'; // …show 'empty list'
  } else {
    return (
      <section className="margin-bottom-basic">
        <header className='grid-row margin-bottom-tiny font-size-small font-bold'>
          <div className='grid-item item-s-3 item-m-5'>
            <h3>Título</h3>
          </div>
          <div className='grid-item item-s-3'>
            <h3>Precio</h3>
          </div>
        </header>

        <div className="list-rows-holder">
          { Object.keys(lotes).map( // …else map thru noticias
            (key, id) => <LotesListItem key={key} id={id} lote={lotes[key]} />
          ) }
        </div>
      </section>
    );
  }

};

LotesList.propTypes = {
  lotes: PropTypes.array,
};

export default LotesList;
