import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';

import { ToastrOptionsConfirm, ToastrOptionsSuccess } from '../../utilities/toastr.js';
import { getResizedImageUrl } from '../../utilities/images.js';

class ImageUploadsImage extends Component {

  constructor(props) {
    super(props);

    this.imageUrl = undefined;

    if(this.props.image !== undefined) {
      this.imageUrl = getResizedImageUrl(this.props.image, '350', false);
    }
  }

  render() {
    return(
      <div key={this.props.image.key} className='list-rows-item grid-row padding-top-micro padding-bottom-micro align-items-center'>
        <div className='grid-item item-s-6'>
          <img src={this.imageUrl} alt='' />
        </div>
        <div className='grid-item flex-grow grid-row justify-end'>
          <button type='button' className='button button-small button-delete' onClick={() => toastr.confirm('¿Seguro que deseas eliminar esta imagen?', ToastrOptionsConfirm(this.props.delete, this.props.image))}>Eliminar</button>
        </div>
      </div>
    );
  }
}

export default ImageUploadsImage;