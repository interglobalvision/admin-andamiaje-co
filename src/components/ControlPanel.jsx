import React from 'react';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from './Nav';
import Welcome from './Welcome';
import Posts from './Posts';
import Logout from '../components/Logout.jsx';
import NoMatch from '../components/NoMatch.jsx';

const ControlPanel = ({ user }) => {
  if(user) {
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
  } else {
    return (
      <Redirect to={{ pathname: '/login' }}/>
    );
  }
};

function mapStateToProps(state) {
  console.log('state', state);
  let { user } = state;

  return {
    user,
  }
}

export default connect(mapStateToProps, null)(ControlPanel);
