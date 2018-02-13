import React from 'react';
import PropTypes from 'prop-types'; // ES6
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import LotesGroup from '../../components/lotes/LotesGroup';

const LotesGroupContainer = ({ allLotes, selectedLotes, onChange }) => (
  <LotesGroup allLotes={allLotes} selectedLotes={selectedLotes} onChange={onChange} />
);

LotesGroupContainer.propTypes = {
  onChange: PropTypes.func.isRequired,
  allLotes: PropTypes.array,
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
