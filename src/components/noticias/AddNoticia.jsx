import React from 'react';

import NoticiaForm  from './NoticiaForm.jsx';

const AddNoticia = () => {
  return (
    <section>
      <header className='grid-row'>
        <div className='grid-item margin-bottom-basic'>
          <h1 className='font-size-large'>Noticia Nueva</h1>
        </div>
      </header>
      <NoticiaForm  />
    </section>
  )
};

export default AddNoticia;
