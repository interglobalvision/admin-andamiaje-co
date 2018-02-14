import React from 'react';
import { withFirebase } from 'react-redux-firebase';

const LoadingOverlay = ({ loadingStatus }) => {
  return (
    <div id='loading-status' className={loadingStatus ? 'grid-row align-items-center justify-center loading' : 'grid-row align-items-center justify-center'}>
      <div className='font-size-large'>Loading...</div>
    </div>
  );
};

export default LoadingOverlay;
