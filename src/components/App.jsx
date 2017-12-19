import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

const App = () => (
  'Hola'
);

function mapStateToProps(state) {
  console.log('state', state);
  let { user } = state;

  return {
    user
  }
}

export default withRouter(connect(mapStateToProps, null)(App));
