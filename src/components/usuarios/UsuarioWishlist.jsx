import React from 'react';

import UsuarioWishlistItem from '../../components/usuarios/UsuarioWishlistItem';

const UsuarioWishlist = ({ wishlist }) => {
  return (
    <section className="margin-bottom-basic">
      <header className='grid-row margin-bottom-tiny font-size-small font-bold'>
        <h4 className='grid-item item-s-12 font-size-small font-bold margin-bottom-tiny'>Wishlist</h4>
        <div className='grid-item item-s-6'>
          <h5>Artista</h5>
        </div>
        <div className='grid-item item-s-6'>
          <h5>Título</h5>
        </div>
      </header>

      <div className="list-rows-holder">
        { Object.keys(wishlist).map(
          (key, id) => <UsuarioWishlistItem key={key} id={id} item={wishlist[key]} />
        ) }
      </div>
    </section>
  );
};

export default UsuarioWishlist;
