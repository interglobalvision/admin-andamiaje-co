import React from 'react';
import PropTypes from 'prop-types'; // ES6

const ObraGroupItem = ({ obra, removeObraFromGroup }) => {
  const { title, year, medium } = obra;

  return(
    <div className='grid-item item-s-6 item-m-3'>
      <div className='card grid-column'>
        <div className='card-body'>
          <h3 className='margin-bottom-tiny'>{title}, {year}</h3>
        </div>
        <div className='card-actions'>
          <button type='button' onClick={() => removeObraFromGroup(obra.id)} className='button button-small button-delete'>Retirar</button>
        </div>
      </div>
    </div>
  );
}

ObraGroupItem.propTypes = {
  obra: PropTypes.shape({
    title: PropTypes.string.isRequired,
    year: PropTypes.string, // TODO: should be a number
  }).isRequired,
  removeObraFromGroup: PropTypes.func.isRequired,
};

export default ObraGroupItem;
