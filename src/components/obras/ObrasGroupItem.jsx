import React from 'react';
import PropTypes from 'prop-types'; // ES6

const ObraGroupItem = ({ obra, moveObraUp, moveObraDown, removeObraFromGroup, upDisabled, downDisabled }) => {
  const { title, year, medium } = obra;

  return(
    <div className='grid-item item-s-3'>
      <h3>{title}, {year}</h3>
      <button type='button' onClick={() => moveObraUp(obra)} disabled={upDisabled} className='button button-small'>↑</button>
      <button type='button' onClick={() => moveObraDown(obra)} disabled={downDisabled} className='button button-small'>↓</button>
      <button type='button' onClick={() => removeObraFromGroup(obra.id)} className='button button-small button-delete'>Retirar</button>
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
