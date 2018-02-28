import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect, isLoaded, isEmpty, getVal } from 'react-redux-firebase';

import LoginForm from '../components/Login.jsx';
import ControlPanel from '../components/ControlPanel.jsx';
import NoMatch from '../components/NoMatch.jsx';

const App = (props) => {
  const { auth, profile } = props;

  if (!isLoaded(auth)) {
    return (
      <div>
        <span>Loading</span>
      </div>
    )
  }

  if (isEmpty(auth) || profile.role !== 'admin') {
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

  return (
    <div>
      <Switch>
        <Route path='/' render={(loadingStatus) => ( <ControlPanel loadingStatus={loadingStatus}/> )} />
        <Route component={NoMatch}/>
      </Switch>
    </div>
  );
};

// sync from firebase into redux
const firebaseWrapped = firebaseConnect()(App);

export default compose(
  withRouter,
  connect(({firebase, loadingStatus }) => ({
    authError: getVal(firebase, 'authError'),
    auth: getVal(firebase, 'auth'),
    profile: getVal(firebase, 'profile'),
    loadingStatus,
  }))
)(firebaseWrapped);
