import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';

import ArtistaSelect from '../../components/artistas/ArtistaSelect';

const ArtistaSelectContainer = ({ value, onChange, artistas }) => (
  <ArtistaSelect artistas={artistas} onChange={onChange} value={value} />
);

export default compose(
  // Get artista path from firebase based on params prop (route params from react-router)
  firebaseConnect([
    'artistas',
  ]),
  // Map state to props
  // firebase = state.firebase
  // ordered = state.firebase.ordered
  connect(({ firebase: { ordered } }) => {
    return ({
      artistas: ordered.artistas,
    })
  })
)(ArtistaSelectContainer);
