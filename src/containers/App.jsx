import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginForm from '../components/Login.jsx';
import ControlPanel from '../components/ControlPanel.jsx';
import NoMatch from '../components/NoMatch.jsx';

const App = (props) => {
  if(props.user.email) {
    return (
      <div>
        <Switch>
          <Route path='/' component={ControlPanel} />
          <Route component={NoMatch}/>
        </Switch>
      </div>
    );
  } else {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={LoginForm} />
          <Route exact path='/login' component={LoginForm} />
          <Route component={NoMatch}/>
        </Switch>
      </div>
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

export default withRouter(connect(mapStateToProps, null)(App));
