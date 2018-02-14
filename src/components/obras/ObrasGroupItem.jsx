import React from 'react';
import PropTypes from 'prop-types'; // ES6

import { getResizedImageUrl } from '../../utilities/images.js';

const ObraGroupItem = ({ obra, moveObraUp, moveObraDown, removeObraFromGroup, upDisabled, downDisabled }) => {
  const { title, year, images } = obra;

  let imageUrl = undefined;

  if(images !== undefined) {
    imageUrl = getResizedImageUrl(images[0], '350', true);
  }

  return(
    <div className='list-rows-item grid-row padding-top-micro padding-bottom-micro align-items-center'>
      <div className='grid-item item-s-2'>
        { imageUrl !== undefined ? <img src={imageUrl} alt='{title}' /> : '' }
      </div>
      <div className='grid-item item-s-3 item-m-5'>
        <h3>{title}, {year}</h3>
      </div>
      <div className='grid-item flex-grow grid-row no-gutter justify-end'>
        <div className='grid-item'>
          <button type='button' onClick={() => moveObraUp(obra)} disabled={upDisabled} className='button button-small'>↑</button>
          <button type='button' onClick={() => moveObraDown(obra)} disabled={downDisabled} className='button button-small'>↓</button>
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
    images: PropTypes.array, // TODO: should be a number
  }).isRequired,
  removeObraFromGroup: PropTypes.func.isRequired,
};

export default ObraGroupItem;
