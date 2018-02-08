import React, { Component } from 'react';
import { connect } from 'react-redux'
import { withFirebase } from 'react-redux-firebase'
import { toastr } from 'react-redux-toastr';

import Dropzone from 'react-dropzone'; // For Dropzone reference check https://github.com/react-dropzone/react-dropzone

import { ToastrOptionsError } from '../../utilities/toastr.js';

@withFirebase
class UploadField extends Component {
  state = {
    isLoading: false,
    files: [],
  }

  constructor(props) {
    super(props);

    this.placeholder = this.props.placeholder || 'Haz click aqurí o arrastra los archivos que quieres cargar';

    // Path in the Storage where the files will get saves
    this.storagePath = this.props.storagePath;

    // Path in the db where the files references will get saved, like an index of files
    this.path = this.props.path;

    // Bind
    this.onDropAccepted = this.onDropAccepted.bind(this);
    this.onDropRejected = this.onDropRejected.bind(this);
  }

  onDropAccepted(files) {

    // Set Loading
    this.setState({ isLoading: true });

    // Upload files
    this.props.firebase
      .uploadFiles(this.storagePath, files, this.path, { progress: true })
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

  onDropRejected(files) {
    files.map( file => {
      return toastr.warning('Error', `Archivo rechazado ${file.name}`, ToastrOptionsError);
    });

  }

  render() {
    const { uploadStatus } = this.props;

    return(
      <Dropzone onDropAccepted={this.onDropAccepted} disabled={this.state.isLoading || this.props.disabled} {...this.props.dropzone} onDropRejected={this.onDropRejected}>
        <p>{ uploadStatus.uploading  ? `Cargando ${uploadStatus.percent}% ` : this.placeholder }</p>
      </Dropzone>
    );

  }

}

// Connect to the redux store to use `uploadStatus`
export default connect(
  // Map state to props
  ({ uploadStatus }) => {
    return ({
      uploadStatus,
    })
  }
)(UploadField);
