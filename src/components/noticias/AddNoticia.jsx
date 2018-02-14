import React from 'react';
import { connect } from 'react-redux';

import NoticiaForm  from './NoticiaForm.jsx';

const AddNoticia = ({ dispatch }) => {
  return (
    <section>
      <div className='grid-row'>
        <div className='grid-item item-s-3 margin-bottom-basic'>
          <h2>Entrada Nueva</h2>
        </div>
      </div>
      <NoticiaForm dispatch={dispatch} />
    </section>
  )
};

export default connect()(AddNoticia);
