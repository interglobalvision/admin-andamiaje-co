import React, { Component } from 'react';
import { withFirebase } from 'react-redux-firebase';
import Dropzone from 'react-dropzone';

@withFirebase
class Uploads extends Component {
  state = {
    isLoading: false,
    files: [],
  }

  constructor(props) {
    super(props);

    this.firebase = this.props.firebase;
    this.storagePath = this.props.storagePath;
    this.path = this.props.path;

    // Bind
    this.onDrop = this.onDrop.bind(this);

    this.onChange = this.props.onChange;
  }

  onDrop(files) {

    // Set Loading
    this.setState({ isLoading: true });

    // Upload files
    this.firebase
      .uploadFiles(this.storagePath, files, this.path)
      .then(files => {
        // Parse response
        const uploadedFiles = files.map( file => {
          const { key, File: { downloadUrl, fullPath, name } } = file;
          return {
            key,
            name,
            downloadUrl,
            fullPath,
          };
        });

        // Unset Loading
        this.setState({ isLoading: false });

        this.onChange(uploadedFiles);

      })
      .catch( error => {
        console.log(error);
      });

  }

  render() {

    return(
      <Dropzone onDrop={this.onDrop} disabled={this.state.isLoading} disablePreview={false} {...this.dropzone}>
        <p>Try dropping some files here, or click to select files to upload.</p>
      </Dropzone>
    );

  }

}

export default Uploads;
