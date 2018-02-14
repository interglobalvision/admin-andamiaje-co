import React from 'react';
import { connect } from 'react-redux';

const LoadingOverlay = ({ loadingStatus }) => {

  const { loading } = loadingStatus;

  return (
    <div id='loading-overlay' className={loading ? 'grid-row align-items-center justify-center loading' : 'grid-row align-items-center justify-center'}>
      <div className='font-size-large'>Cargando...</div>
    </div>
  );
};

export default connect(({ loadingStatus }) => {
  return { loadingStatus }
})(LoadingOverlay)
