import React from 'react';

import ObraForm from './ObraForm.jsx';

const AddObra = () => {
  return (
    <section>
      <header className='grid-row'>
        <div className='grid-item margin-bottom-basic'>
          <h1 className='font-size-large'>Obra Nueva</h1>
        </div>
      </header>
      <ObraForm />
    </section>
  )
};

export default AddObra;
