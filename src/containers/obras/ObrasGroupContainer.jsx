import React from 'react';
import PropTypes from 'prop-types'; // ES6
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';

import ObrasGroup from '../../components/obras/ObrasGroup';

const ObrasGroupContainer = ({ allObras, selectedObras, onChange }) => (
  <ObrasGroup allObras={allObras} selectedObras={selectedObras} onChange={onChange}/>
);

ObrasGroupContainer.propTypes = {
  allObras: PropTypes.array,
  selectedObras: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};

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
