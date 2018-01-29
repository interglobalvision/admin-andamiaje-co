import React from 'react';

const ObraGroupItem = ({ obra, removeObraFromGroup }) => {
  const { title, year, medium } = obra;

  return(
    <div className='grid-item item-s-3'>
      <h3>{title}, {year}</h3>
      <p>{medium}</p>
      <button onClick={() => removeObraFromGroup(obra.id)} className='button'>Retirar</button>
    </div>
  );
}

export default ObraGroupItem;
