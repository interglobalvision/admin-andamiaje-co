/* global confirm */
import React from 'react';

const UsuarioWishlistItem = ({ item }) => {
  const { artista, title } = item;

  return(
    <div className='list-rows-item grid-row padding-top-micro padding-bottom-micro align-items-center'>
      <div className='grid-item item-s-6'>
        <span>{artista.name}</span>
      </div>
      <div className='grid-item item-s-6'>
        <span>{title}</span>
      </div>
    </div>
  );
}

export default UsuarioWishlistItem;
