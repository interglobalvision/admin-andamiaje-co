import React from 'react';
import PropTypes from 'prop-types'; // ES6

const LoteGroupItem = ({ lote, removeLoteFromGroup }) => {
  const { artista, title } = lote;

  return(
    <div className='grid-item item-s-3'>
      <h3>{artista.name} - {title}</h3>
      <button type='button' onClick={() => removeLoteFromGroup(lote.id)} className='button button-small button-delete'>Retirar</button>
    </div>
  );
}

LoteGroupItem.propTypes = {
  lote: PropTypes.shape({
    title: PropTypes.string.isRequired,
    artista: PropTypes.object,
  }).isRequired,
  removeLoteFromGroup: PropTypes.func.isRequired,
};

export default LoteGroupItem;
