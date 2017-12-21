import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Nav from './Nav';
import NoMatch from '../components/NoMatch.jsx';

const ControlPanel = ({ user }) => {
  if(user) {
    return (
      <div>
        <Nav />
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

export default withRouter(connect(mapStateToProps, null)(ControlPanel));
