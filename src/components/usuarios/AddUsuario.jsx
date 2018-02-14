import React from 'react';

import UsuarioForm  from './UsuarioForm.jsx';

const AddUsuario = () => {
  return (
    <section>
      <header className='grid-row'>
        <div className='grid-item margin-bottom-basic'>
          <h1 className='font-size-large'>Usuario Nuevo</h1>
        </div>
      </header>
      <UsuarioForm />
    </section>
  )
};

export default AddUsuario;
