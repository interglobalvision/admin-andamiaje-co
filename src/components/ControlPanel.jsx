import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Nav from './Nav';
import Welcome from './Welcome';
import Noticias from '../containers/Noticias';
import AddNoticia from './AddNoticia';
import NoMatch from '../components/NoMatch';

const ControlPanel = () => {
  return (
    <div>
      <Nav />
      <div className='container'>
        <Switch>
          <Route exact path='/noticias' component={Noticias} />
          <Route exact path='/noticias/add' component={AddNoticia} />
          <Route exact path='/' component={Welcome} />
          <Route component={NoMatch}/>
        </Switch>
      </div>
    </div>
  )
};

export default ControlPanel;
