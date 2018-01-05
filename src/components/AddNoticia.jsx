import React from 'react';

import NoticiaForm  from './NoticiaForm.jsx';

const AddNoticia = () => {
  return (
    <section>
      <div className='grid-row'>
        <div className='grid-item item-s-3'>
          <h2>Entrada Nueva</h2>
        </div>
      </div>
      <NoticiaForm />
    </section>
  )
};

export default AddNoticia;
