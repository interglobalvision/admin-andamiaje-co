import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { firebaseApp } from '../firebase'

const Logout = (props) => {
  firebaseApp.auth().signOut();

  return (
    <div>
      <Redirect to={{ pathname: '/' }}/>
    </div>
  );
};

export default connect(null, null)(Logout);
