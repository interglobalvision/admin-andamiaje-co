import React, { Component } from 'react';
import { withFirebase } from 'react-redux-firebase';
import Dropzone from 'react-dropzone'; // For Dropzone reference check https://github.com/react-dropzone/react-dropzone

@withFirebase
class UploadField extends Component {
  state = {
    isLoading: false,
    files: [],
  }

  constructor(props) {
    super(props);

    // Path in the Storage where the files will get saves
    this.storagePath = this.props.storagePath;

    // Path in the db where the files will get saved
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

        // Create an array with the data we need from the uploaded files
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
        console.log(error) ;
        // Unset Loading
        this.setState({ isLoading: false });
      });

  }

  componentWillUnmount() {
  }

  render() {

    return(
      <Dropzone onDrop={this.onDrop} disabled={this.state.isLoading || this.props.disabled} {...this.props.dropzone}>
        <p>Try dropping some files here, or click to select files to upload.</p>
      </Dropzone>
    );

  }

}

export default UploadField;
