import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Nav from './Nav';
import Welcome from './Welcome';
import Posts from './Posts';
import NoMatch from '../components/NoMatch.jsx';

const ControlPanel = () => {
  return (
    <div className='container'>
      <Nav />
      <div>
        <Switch>
          <Route path='/posts' component={Posts} />
          <Route exact path='/' component={Welcome} />
          <Route component={NoMatch}/>
        </Switch>
      </div>
    </div>
  )
};

export default ControlPanel;
