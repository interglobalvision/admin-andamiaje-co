import React from 'react';
import { connect } from 'react-redux';

import ObraForm from './ObraForm.jsx';

const AddObra = ({ dispatch }) => {
  return (
    <section>
      <div className='grid-row'>
        <div className='grid-item item-s-3'>
          <h2>Entrada Nueva</h2>
        </div>
      </div>
      <ObraForm dispatch={dispatch} />
    </section>
  )
};

export default connect()(AddObra);
