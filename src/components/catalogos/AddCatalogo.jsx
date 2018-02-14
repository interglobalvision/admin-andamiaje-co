import React from 'react';

import LoteForm from './CatalogoForm.jsx';

const AddCatalogo = () => {
  return (
    <section>
      <div className='grid-row'>
        <div className='grid-item item-s-3'>
          <h2>Entrada Nueva</h2>
        </div>
      </div>
      <LoteForm />
    </section>
  )
};

export default AddCatalogo;
