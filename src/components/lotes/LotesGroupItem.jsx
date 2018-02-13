import React from 'react';
import PropTypes from 'prop-types'; // ES6

import { Link } from 'react-router-dom';

const LoteGroupItem = ({ lote, moveLoteUp, moveLoteDown, removeLoteFromGroup, upDisabled, downDisabled }) => {
  const { id, artista, title } = lote;

  return(
    <div className='list-rows-item grid-row padding-top-micro padding-bottom-micro align-items-center'>
      <div className='grid-item item-s-3 item-m-5'>
        <span><Link className="link-underline" to={'/lotes/' + id}>{title}</Link></span>
      </div>
      <div className='grid-item item-s-3'>
        <span>{artista.name}</span>
      </div>
      <div className='grid-item flex-grow grid-row no-gutter justify-end'>
        <div className='grid-item'>
          <button type='button' onClick={() => moveLoteUp(lote)} disabled={upDisabled} className='button button-small'>↑</button>
          <button type='button' onClick={() => moveLoteDown(lote)} disabled={downDisabled} className='button button-small'>↓</button>
          <button type='button' onClick={() => removeLoteFromGroup(lote.id)} className='button button-small button-delete'>Retirar</button>
        </div>
      </div>
    </div>
  );
}

LoteGroupItem.propTypes = {
  lote: PropTypes.shape({
    title: PropTypes.string.isRequired,
    artista: PropTypes.object,
  }).isRequired,
  moveLoteUp: PropTypes.func.isRequired,
  moveLoteDown: PropTypes.func.isRequired,
  removeLoteFromGroup: PropTypes.func.isRequired,
};

export default LoteGroupItem;
