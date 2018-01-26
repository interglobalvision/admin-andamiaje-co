import React, { Component } from 'react';
import UploadField from './UploadField';

class Uploads extends Component {
  render() {
    return(
      <section>
        <div className='grid-row margin-bottom-tiny'>
          <div className='grid-item item-s-12'>
            <h4 className='font-size-small font-bold'>{this.props.title}</h4>
          </div>
        </div>
        <div className='grid-row margin-bottom-basic'>
          {this.props.files.map( file => (
            <div key={file.key} className='grid-item item-s-6 item-m-3'>
              <img src={file.downloadURL} alt="" />
              <button onClick={() => this.props.deleteFile(file)}>Eliminar</button>
            </div>
          ))}
          { // Depending on the number of images and if mutiple uploads are enabled, show/hide the upload field
            this.props.dropzone.multiple || (!this.props.dropzone.multiple && this.props.files.length === 0)  ?
              <div className='grid-item item-s-6 item-m-3'>
                <UploadField {...this.props} />
              </div>
              : ''
            }
        </div>
      </section>
    );
  }
}

export default Uploads;
