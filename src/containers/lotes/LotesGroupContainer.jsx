import React from 'react';
import PropTypes from 'prop-types'; // ES6
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import LotesGroup from '../../components/lotes/LotesGroup';

const LotesGroupContainer = ({ addLoteToGroup, allLotes, selectedLotes, removeLoteFromGroup }) => (
  <LotesGroup allLotes={allLotes} addLoteToGroup={addLoteToGroup} selectedLotes={selectedLotes} removeLoteFromGroup={removeLoteFromGroup}/>
);

LotesGroupContainer.propTypes = {
  addLoteToGroup: PropTypes.func.isRequired,
  allLotes: PropTypes.array,
  removeLoteFromGroup: PropTypes.func.isRequired,
  selectedLotes: PropTypes.array,
};

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
      allLotes: ordered.lotes,
    })
  })
)(LotesGroupContainer);
