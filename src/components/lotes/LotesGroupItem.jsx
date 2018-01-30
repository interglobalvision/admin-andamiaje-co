import React from 'react';
import PropTypes from 'prop-types'; // ES6

const LoteGroupItem = ({ lote, removeLoteFromGroup }) => {
  const { title, year, medium } = lote;

  return(
    <div className='grid-item item-s-3'>
      <h3>{title}, {year}</h3>
      <button onClick={() => removeLoteFromGroup(lote.id)} className='button'>Retirar</button>
    </div>
  );
}

LoteGroupItem.propTypes = {
  lote: PropTypes.shape({
    title: PropTypes.string.isRequired,
    year: PropTypes.string, // TODO: should be a number
  }).isRequired,
  removeLoteFromGroup: PropTypes.func.isRequired,
};

export default LoteGroupItem;
