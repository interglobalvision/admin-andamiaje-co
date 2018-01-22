import React from 'react';

import LoteForm from './LoteForm.jsx';

const AddLote = () => {
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

export default AddLote;