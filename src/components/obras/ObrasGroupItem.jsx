import React from 'react';
import PropTypes from 'prop-types'; // ES6

const ObraGroupItem = ({ obra, removeObraFromGroup }) => {
  const { title, year, medium } = obra;

  return(
    <div className='grid-item item-s-3'>
      <h3>{title}, {year}</h3>
      <button type='button' onClick={() => removeObraFromGroup(obra.id)} className='button'>Retirar</button>
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
