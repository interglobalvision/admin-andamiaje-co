import React from 'react';

import LoteForm from './CatalogoForm.jsx';

const AddCatalogo = () => {
  return (
    <section>
      <header className='grid-row'>
        <div className='grid-item margin-bottom-basic'>
          <h1 className='font-size-large'>Catalogo Nuevo</h1>
        </div>
      </header>
      <LoteForm />
    </section>
  )
};

export default AddCatalogo;
