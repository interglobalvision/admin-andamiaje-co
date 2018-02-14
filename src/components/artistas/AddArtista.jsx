import React from 'react';
import { connect } from 'react-redux';

import ArtistaForm from './ArtistaForm.jsx';

const AddArtista = ({ dispatch }) => {
  return (
    <section>
      <div className='grid-row'>
        <div className='grid-item item-s-3 margin-bottom-basic'>
          <h2>Entrada Nueva</h2>
        </div>
      </div>
      <ArtistaForm dispatch={dispatch} />
    </section>
  )
};

export default connect()(AddArtista);
