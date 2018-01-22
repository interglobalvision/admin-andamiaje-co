import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import ObrasGroup from '../../components/obras/ObrasGroup';

const ObrasGroupContainer = ({ onChange, obras }) => (
  <ObrasGroup obras={obras} onChange={onChange} />
);

export default compose(
  // Get artista path from firebase based on params prop (route params from react-router)
  firebaseConnect([
    'obras',
  ]),
  // Map state to props
  // firebase = state.firebase
  // ordered = state.firebase.ordered
  connect(({ firebase: { ordered } }) => {
    return ({
      obras: ordered.obras,
    })
  })
)(ObrasGroupContainer);
