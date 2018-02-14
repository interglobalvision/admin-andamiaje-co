import React from 'react';

import ArtistaForm from './ArtistaForm.jsx';

const AddArtista = () => {
  return (
    <section>
      <header className='grid-row'>
        <div className='grid-item margin-bottom-basic'>
          <h1 className='font-size-large'>Artista Nuevo</h1>
        </div>
      </header>
      <ArtistaForm />
    </section>
  )
};

export default AddArtista;
