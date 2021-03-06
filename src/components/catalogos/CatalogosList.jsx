import React from 'react';
import PropTypes from 'prop-types';

import { isLoaded, isEmpty } from 'react-redux-firebase';

import CatalogosListItem from '../../components/catalogos/CatalogosListItem';

const CatalogosList = ({ catalogos }) => {
  if (!isLoaded(catalogos)) { // If not loaded…
    return 'Loading'; // …show 'loading'
  } else if (isEmpty(catalogos)) { // …else. If is empty…
    return 'No hay catalogos que mostrar'; // …show 'empty list'
  } else {
    return (
      <section>
        <header className='grid-row margin-bottom-tiny font-size-small font-bold'>
          <div className='grid-item item-s-3 item-m-4'>
            <h3>Título</h3>
          </div>
        </header>

        <div className="list-rows-holder">
          { Object.keys(catalogos).map( // …else map thru noticias
            (key, id) => <CatalogosListItem key={key} id={id} catalogo={catalogos[key]} />
          ) }
        </div>
      </section>
    );
  }

};

CatalogosList.propTypes = {
  catalogos: PropTypes.array,
};

export default CatalogosList;
