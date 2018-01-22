import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import LotesGroup from '../../components/lotes/LotesGroup';

const LotesGroupContainer = ({ onChange, lotes }) => (
  <LotesGroup lotes={lotes} onChange={onChange} />
);

export default compose(
  // Get artista path from firebase based on params prop (route params from react-router)
  firebaseConnect([
    'lotes',
  ]),
  // Map state to props
  // firebase = state.firebase
  // ordered = state.firebase.ordered
  connect(({ firebase: { ordered } }) => {
    return ({
      lotes: ordered.lotes,
    })
  })
)(LotesGroupContainer);
