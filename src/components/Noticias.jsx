import React from 'react';
import { Link } from 'react-router-dom';

const Noticias = (props) => {
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
    </section>
  );
};

export default Noticias;
