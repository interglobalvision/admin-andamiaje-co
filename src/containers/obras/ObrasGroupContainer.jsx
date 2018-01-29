import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import ObrasGroup from '../../components/obras/ObrasGroup';

const ObrasGroupContainer = ({ addObraToGroup, allObras, selectedObras, removeObraFromGroup }) => (
  <ObrasGroup allObras={allObras} addObraToGroup={addObraToGroup} selectedObras={selectedObras} removeObraFromGroup={removeObraFromGroup}/>
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
      allObras: ordered.obras,
    })
  })
)(ObrasGroupContainer);
