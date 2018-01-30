import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Nav from './Nav';
import Welcome from './Welcome';

import Noticias from '../containers/Noticias';
import AddNoticia from './AddNoticia';
import UpdateNoticia from '../containers/UpdateNoticia';

import Artistas from '../containers/artistas/Artistas';
import AddArtista from './artistas/AddArtista';
import UpdateArtista from '../containers/artistas/UpdateArtista';

import Lotes from '../containers/lotes/Lotes';
import AddLote from './lotes/AddLote';
import UpdateLote from '../containers/lotes/UpdateLote';

import Usuarios from '../containers/usuarios/Usuarios';
import AddUsuario from './usuarios/AddUsuario';
import UpdateUsuario from '../containers/usuarios/UpdateUsuario';

import Obras from '../containers/obras/Obras';
import AddObra from './obras/AddObra';
import UpdateObra from '../containers/obras/UpdateObra';

import Catalogos from '../containers/catalogos/Catalogos';
import AddCatalogo from './catalogos/AddCatalogo';
import UpdateCatalogo from '../containers/catalogos/UpdateCatalogo';

import NoMatch from '../components/NoMatch';

import ReduxToastr from 'react-redux-toastr';

const ControlPanel = () => {
  return (
    <div>
      <Nav />
      <ReduxToastr
        position="top-right"
        transitionIn="fadeIn"
        transitionOut="fadeOut" />
      <div className='container'>
        <Switch>
          <Route exact path='/noticias' component={Noticias} />
          <Route exact path='/noticias/add' component={AddNoticia} />
          <Route path='/noticias/:key' component={UpdateNoticia} />
          <Route exact path='/artistas' component={Artistas} />
          <Route exact path='/artistas/add' component={AddArtista} />
          <Route path='/artistas/:key' component={UpdateArtista} />
          <Route exact path='/lotes' component={Lotes} />
          <Route exact path='/lotes/add' component={AddLote} />
          <Route path='/lotes/:key' component={UpdateLote} />
          <Route exact path='/usuarios' component={Usuarios} />
          <Route exact path='/usuarios/add' component={AddUsuario} />
          <Route path='/usuarios/:key' component={UpdateUsuario} />
          <Route exact path='/obras' component={Obras} />
          <Route exact path='/obras/add' component={AddObra} />
          <Route path='/obras/:key' component={UpdateObra} />
          <Route exact path='/catalogos' component={Catalogos} />
          <Route exact path='/catalogos/add' component={AddCatalogo} />
          <Route path='/catalogos/:key' component={UpdateCatalogo} />
          <Route exact path='/' component={Welcome} />
          <Route component={NoMatch}/>
        </Switch>
      </div>
    </div>
  )
};

export default ControlPanel;
