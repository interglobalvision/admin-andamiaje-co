import React from 'react';
import { connect } from 'react-redux';

import UsuarioForm  from './UsuarioForm.jsx';

const AddUsuario = ({ dispatch }) => {
  return (
    <section>
      <div className='grid-row'>
        <div className='grid-item item-s-3'>
          <h2>Usuario Nueva</h2>
        </div>
      </div>
      <UsuarioForm dispatch={dispatch} />
    </section>
  )
};

export default connect()(AddUsuario);
