import React from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';

import UsuariosListItem from '../../components/usuarios/UsuariosListItem';

const UsuariosList = ({ usuarios, currentUID }) => {
  if (!isLoaded(usuarios)) { // If not loaded…
    return 'Loading'; // …show 'loading'
  } else if (isEmpty(usuarios)) { // …else. If is empty…
    return 'No hay usuarios que mostrar'; // …show 'empty list'
  } else {
    return (
      <section className="margin-bottom-basic">
        <header className='grid-row margin-bottom-tiny font-size-small font-bold'>
          <div className='grid-item item-s-3 item-m-4 item-l-5'>
            <h3>Nombre</h3>
          </div>
          <div className='grid-item item-s-2'>
            <h3>Tipo</h3>
          </div>
          <div className='grid-item item-s-2'>
            <h3>Estado</h3>
          </div>
        </header>

        <div className="list-rows-holder">
          { Object.keys(usuarios).map( // …else map thru usuarios
            (key, id) => <UsuariosListItem key={key} id={id} usuario={usuarios[key]} currentUID={currentUID} />
          ) }
        </div>
      </section>
    );
  }

};

export default UsuariosList;
