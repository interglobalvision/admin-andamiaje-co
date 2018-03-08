import React from 'react';
import PropTypes from 'prop-types';

import { isLoaded, isEmpty } from 'react-redux-firebase';

import LotesListItem from '../../components/lotes/LotesListItem';

const LotesList = ({ lotes, users }) => {
  if (!isLoaded(lotes) || !isLoaded(users)) { // If not loaded…
    return 'Loading'; // …show 'loading'
  } else if (isEmpty(lotes)) { // …else. If is empty…
    return 'No hay lotes que mostrar'; // …show 'empty list'
  } else {
    return (
      <section className="margin-bottom-basic">
        <header className='grid-row margin-bottom-tiny font-size-small font-bold'>
          <div className='grid-item item-s-3 item-m-4'>
            <h3>Título</h3>
          </div>
          <div className='grid-item item-s-3'>
            <h3>Artista</h3>
          </div>
          <div className='grid-item item-s-1'>
            <h3>Precio</h3>
          </div>
          <div className='grid-item item-s-1'>
            <h3>Deseos</h3>
          </div>
        </header>

        <div className="list-rows-holder">
          { Object.keys(lotes).map( // …else map thru noticias
            (key, id) => {
              let wishlisters = 0;

              for(let i = 0; i <= (users.length - 1); i++) {
                if (users[i].value.role === 'member') {
                  if (Object.values(users[i].value.wishlist).find(item => item.id === lotes[id].key)) {
                    wishlisters++;
                  }
                }
              }

              return (<LotesListItem key={key} id={id} lote={lotes[key]} wishlisters={wishlisters}/>)
            }
          ) }
        </div>
      </section>
    );
  }

};

LotesList.propTypes = {
  lotes: PropTypes.array,
  users: PropTypes.array,
};

export default LotesList;
