import React from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import LoginForm from '../components/Login.jsx';
import ControlPanel from '../components/ControlPanel.jsx';
import NoMatch from '../components/NoMatch.jsx';

const App = (props) => {
  if(props.user.email) {
    return (
      <div>
        <Route exact path='/' component={ControlPanel} />
        <Route component={NoMatch}/>
      </div>
    );
  } else {
    return (
      <div>
        <Route exact path='/' component={LoginForm} />
        <Route exact path='/login' component={LoginForm} />
        <Route component={NoMatch}/>
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
