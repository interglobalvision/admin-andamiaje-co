import React from 'react';

const ObraGroupItem = ({ obra }) => {
  const { key } = obra.id;
  const { title, year, medium } = obra;

  return(
    <div className='grid-item item-s-3'>
      <h3>{obra.title}</h3>
    </div>
  );
}

export default ObraGroupItem;