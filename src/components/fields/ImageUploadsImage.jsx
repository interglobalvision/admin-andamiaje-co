import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';

import { ToastrOptionsConfirm } from '../../utilities/toastr.js';
import { getResizedImageUrl } from '../../utilities/images.js';

class ImageUploadsImage extends Component {

  constructor(props) {
    super(props);

    this.imageUrl = undefined;

    if(this.props.image !== undefined) {
      this.imageUrl = this.props.image.downloadURL;
    }

  }

  render() {
    return(
      <div key={this.props.image.key} className='grid-item item-s-6 item-m-4 item-l-3 margin-bottom-small'>
        <div className='card'>
          <div className='card-body'>
            <img src={this.imageUrl} alt='' />
          </div>

          <div className='card-actions grid-row button-row'>
            { this.props.upDisabled && this.props.downDisabled ? '' : <div className='grid-item'><button type='button' onClick={() => this.props.moveUp(this.props.image)} disabled={this.props.upDisabled} className='button button-small'>↑</button></div> }

            { this.props.upDisabled && this.props.downDisabled ? '' : <div className='grid-item'><button type='button' onClick={() => this.props.moveDown(this.props.image)} disabled={this.props.downDisabled} className='button button-small'>↓</button></div> }

            <div className='grid-item'><button type='button' className='button button-small button-delete' onClick={() => toastr.confirm('¿Seguro que deseas eliminar esta imagen?', ToastrOptionsConfirm(this.props.delete, this.props.image))}>Eliminar</button></div>
          </div>
        </div>
      </div>
    );
  }
}

export default ImageUploadsImage;
