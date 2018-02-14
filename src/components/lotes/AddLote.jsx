import React from 'react';

import LoteForm from './LoteForm.jsx';

const AddLote = () => {
  return (
    <section>
      <header className='grid-row'>
        <div className='grid-item margin-bottom-basic'>
          <h1 className='font-size-large'>Lote Nuevo</h1>
        </div>
      </header>
      <LoteForm />
    </section>
  )
};

export default AddLote;
