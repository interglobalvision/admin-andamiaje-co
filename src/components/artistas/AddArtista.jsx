import React from 'react';

import ArtistaForm from './ArtistaForm.jsx';

const AddArtista = () => {
  return (
    <section>
      <div className='grid-row'>
        <div className='grid-item item-s-3'>
          <h2>Entrada Nueva</h2>
        </div>
      </div>
      <ArtistaForm />
    </section>
  )
};

export default AddArtista;
