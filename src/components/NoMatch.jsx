import React from 'react';

import ReactSVG from 'react-svg';

const NoMatch = () => (
  <section className='container'>
    <div className='grid-row margin-top-basic margin-bottom-small'>
      <div className='grid-item item-s-12 margin-bottom-tiny'>
        <ReactSVG
          path='/andamiaje-logo.svg'
          wrapperClassName='logo-wrapper'
          className='black-logo'
        />
      </div>
      <div className='grid-item item-s-12'>
        <h1 className='margin-bottom-small'>404</h1>
        <a href='/' className='button'>Regresar</a>
      </div>
    </div>

  </section>
)

export default NoMatch;
