import React from 'react';
import { connect } from 'react-redux';

import LoteForm from './LoteForm.jsx';

const AddLote = ({ dispatch }) => {
  return (
    <section>
      <div className='grid-row'>
        <div className='grid-item item-s-3'>
          <h2>Entrada Nueva</h2>
        </div>
      </div>
      <LoteForm dispatch={dispatch} />
    </section>
  )
};

export default connect()(AddLote);
