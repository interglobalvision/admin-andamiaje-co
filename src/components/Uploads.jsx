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

    this.storagePath = this.props.storagePath;
    this.path = this.props.path;

    // Bind
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(files) {

    // Set Loading
    this.setState({ isLoading: true });

    // Upload files
    this.props.firebase
      .uploadFiles(this.storagePath, files, this.path)
      .then(files => {
        // Parse response
        const uploadedFiles = files.map( file => {
          const { key, File: { downloadURL, fullPath, name } } = file;
          return {
            key,
            name,
            downloadURL,
            fullPath,
          };
        });

        // Unset Loading
        this.setState({ isLoading: false });

        // Call onChange function (comes from props)
        this.props.onChange(uploadedFiles);

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
