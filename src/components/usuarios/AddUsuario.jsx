import React from 'react';

import UsuarioForm  from './UsuarioForm.jsx';

const AddUsuario = () => {
  return (
    <section>
      <div className='grid-row'>
        <div className='grid-item item-s-3'>
          <h2>Usuario Nueva</h2>
        </div>
      </div>
      <UsuarioForm />
    </section>
  )
};

export default AddUsuario;
