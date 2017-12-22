import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Nav from './Nav';
import Welcome from './Welcome';
import Posts from './Posts';
import Logout from '../components/Logout.jsx';
import NoMatch from '../components/NoMatch.jsx';

const ControlPanel = () => {
  return (
    <div>
      <Nav />
      <div>
        <Switch>
          <Route path='/posts' component={Posts} />
          <Route path='/logout' component={Logout} />
          <Route exact path='/' component={Welcome} />
          <Route component={NoMatch}/>
        </Switch>
      </div>
    </div>
  )
};

export default ControlPanel;
