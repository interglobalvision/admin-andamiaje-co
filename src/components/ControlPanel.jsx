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

import Obras from '../containers/obras/Obras';
import AddObra from './obras/AddObra';
import UpdateObra from '../containers/obras/UpdateObra';

import NoMatch from '../components/NoMatch';

const ControlPanel = () => {
  return (
    <div>
      <Nav />
      <div className='container'>
        <Switch>
          <Route exact path='/noticias' component={Noticias} />
          <Route exact path='/noticias/add' component={AddNoticia} />
          <Route path='/noticias/:key' component={UpdateNoticia} />
          <Route exact path='/artistas' component={Artistas} />
          <Route exact path='/artistas/add' component={AddArtista} />
          <Route path='/artistas/:key' component={UpdateArtista} />
          <Route exact path='/obras' component={Obras} />
          <Route exact path='/obras/add' component={AddObra} />
          <Route path='/obras/:key' component={UpdateObra} />
          <Route exact path='/' component={Welcome} />
          <Route component={NoMatch}/>
        </Switch>
      </div>
    </div>
  )
};

export default ControlPanel;
