import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toastr } from 'react-redux-toastr';

import ImageUploadsImage from './ImageUploadsImage';
import UploadField from './UploadField';

import { ToastrOptionsConfirm } from '../../utilities/toastr.js';

import { setIsLoading, setIsLoaded } from '../../redux/actions/loadingStatusActions'

const mapDispatchToProps = dispatch =>  ({
  setIsLoaded: () => dispatch(setIsLoaded()),
  setIsLoading: () => dispatch(setIsLoading()),
});

@connect(null, mapDispatchToProps)
class ImageUploads extends Component {
  state = {
    error: {
      message: '',
    },
    isLoading: false,
  }

  // Uploads
  storagePath = 'uploads'; // path in the storage
  path = 'uploads'; // path in the db

  constructor(props) {
    super(props);

    this.deleteImage = this.deleteImage.bind(this);
    this.handleUploadsChange = this.handleUploadsChange.bind(this);
  }

  // Delete image and remove from images array
  deleteImage(image) {

    // Set Loading
    this.setState({ isLoading: true });
    this.props.setIsLoading();

    // deleteFile(storagePath, dbPath)
    this.props.firebase.deleteFile(image.fullPath, `${this.path}/${image.key}`)
      .then(deletedImage => {

        // Filter out the deleted image from the current state
        const images = this.props.images.filter( image => {
          return image.fullPath !== deletedImage.path;
        });

        // Update images array
        this.props.updateImages(images);
      })
      .catch( error => {
        console.log(error);
      })
      .then( () => {
        // Unset Loading
        this.setState({ isLoading: false })
        this.props.setIsLoaded();
      });
  }

  //
  handleUploadsChange(images) {
    this.props.updateImages([...this.props.images, ...images])
  }

  render() {
    return(
      <section>
        <div className='grid-row margin-bottom-tiny'>
          <div className='grid-item item-s-12'>
            <h4 className='font-size-small font-bold'>{this.props.title}</h4>
          </div>
        </div>
        <div className='image-upload-images'>
          {this.props.images.map( image => (
            <ImageUploadsImage key={image.key} image={image} delete={this.deleteImage} />
          ))}
          { // Depending on the number of images and if mutiple uploads are enabled, show/hide the upload field
            this.props.dropzone.multiple || (!this.props.dropzone.multiple && this.props.images.length === 0)  ?
              <div className='grid-item item-s-6 item-m-3'>
                <UploadField placeholder={this.props.placeholder} storagePath={this.storagePath} path={this.path} disabled={this.props.disabled} dropzone={this.props.dropzone} onChange={this.handleUploadsChange} />
              </div>
              : ''
            }
        </div>
      </section>
    );
  }
}

export default ImageUploads;
