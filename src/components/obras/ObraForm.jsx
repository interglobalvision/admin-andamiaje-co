import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import ArtistaSelectContainer from '../../containers/artistas/ArtistaSelectContainer';

import { ToastrOptionsSuccess } from '../../utilities/toastr.js';

import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import ImageUploads from '../fields/ImageUploads';

import { ParseEditorContent, emptyEditorState } from '../../utilities/editor';
import EMOJIS from '../../utilities/emojis.js';
import { TECNICAS } from '../../utilities/constants.js';

import { setIsLoading, setIsLoaded } from '../../redux/actions/loadingStatusActions'

const mapDispatchToProps = dispatch =>  ({
  setIsLoaded: () => dispatch(setIsLoaded()),
  setIsLoading: () => dispatch(setIsLoading()),
});

@firebaseConnect()
@withRouter
@connect(null, mapDispatchToProps)
class ObraForm extends Component {

  state = {
    title: '',
    year: '',
    artista: '',
    materials: '',
    dimensions: '',
    tecnica: '',
    notesEditorState: '',
    notesRawContent: emptyEditorState,
    images: [],
    error: {
      message: '',
    },
    isLoading: false,
  }

  // Uploads
  storagePath = 'uploads'; // path in the storage
  path = 'uploads'; // path in the db
  multipleUploads = true;

  constructor(props) {
    super(props);

    // If component recieves obra as prop we merge it with initial state (used for editing)
    this.state = { ...this.state, ...props.obra };

    // Bind
    this.handleArtistaChange = this.handleArtistaChange.bind(this);
    this.handleNotesEditorChange = this.handleNotesEditorChange.bind(this);
    this.handleUploadsChange = this.handleUploadsChange.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }

  componentWillMount() {

    // Parse content
    this.setState({
      notesEditorState: ParseEditorContent(this.state.notesRawContent),
    });
  }

  deleteImage(image) {

    // Set Loading
    this.setState({ isLoading: true })

    // deleteFile(storagePath, dbPath)
    this.props.firebase.deleteFile(image.fullPath, `${this.path}/${image.key}`)
      .then(deletedImage => {

        // Filter out the deleted image from the current state
        const images = this.state.images.filter( image => {
          return image.fullPath !== deletedImage.path;
        });

        // Save the new state
        this.setState({ images });

        // If updating an Obra, update only `images` in the db entry
        if (this.props.id) {
          return this.props.firebase
            .update(`obras/${this.props.id}`, {
              images,
            })
        }
      })
      .catch( error => {
        console.log(error);
      })
      .then( () => {
        // Unset Loading
        this.setState({ isLoading: false })
      });
  }

  addObra() {
    const { title, year, artista, materials, dimensions, tecnica, notesRawContent, images } = this.state;

    this.setState({ isLoading: true })
    this.props.setIsLoading();

    this.props.firebase
      .push('obras', {
        title,
        year,
        artista,
        materials,
        dimensions,
        tecnica,
        notesRawContent,
        images,
      })
      .then(() => {
        this.setState({ isLoading: false })
        this.props.setIsLoaded();
        this.props.history.push('/obras');

        // Display success toast
        toastr.success('Éxito', 'Obra creada', ToastrOptionsSuccess);
      })

  }

  updateObra() {
    const { title, year, artista, materials, dimensions, tecnica, notesRawContent, images } = this.state;

    this.setState({ isLoading: true })
    this.props.setIsLoading();

    this.props.firebase
      .update(`obras/${this.props.id}`, {
        title,
        year,
        artista,
        materials,
        dimensions,
        tecnica,
        notesRawContent,
        images,
      })
      .then(() => {
        this.setState({ isLoading: false })
        this.props.setIsLoaded();

        // Display success toast
        toastr.success('Éxito', 'Obra actualizada');
      })

  }

  handleArtistaChange({id, name}) {
    if(id !== undefined || id !== '') {
      this.setState({
        artista: {
          id,
          name,
        },
      });
    }
  }

  handleNotesEditorChange(notesEditorState) {
    // Update Editor state and convert content to JSON for database
    this.setState({
      notesEditorState,
      notesRawContent: JSON.stringify(convertToRaw(notesEditorState.getCurrentContent())),
    });
  }

  handleTecnicaChange(tecnica) {
    this.setState({
      tecnica,
    });
  }

  handleUploadsChange(images) {
    this.setState({images});
  }

  render() {
    return (
      <form onSubmit={event => event.preventDefault()}>

        <div className='grid-row'>
          <div className='grid-item item-s-12 item-m-8 margin-bottom-basic'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='title'>Título</label></h4>
            <input
              id='title'
              name='title'
              type='text'
              disabled={this.state.isLoading}
              value={this.state.title}
              onChange={ event => this.setState({ title: event.target.value })}
            />
          </div>

          <div className='grid-item item-s-12 item-m-4 margin-bottom-basic'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='year'>Año</label></h4>
            <div className='grid-row align-items-center'>
              <input
                id='year'
                name='year'
                type='text'
                disabled={this.state.isLoading}
                value={this.state.year}
                onChange={ event => this.setState({ year: event.target.value })}
              />
            </div>
          </div>

          <div className='grid-item item-s-12 item-l-4 margin-bottom-basic'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='artista'>Artista</label></h4>
            <ArtistaSelectContainer value={this.state.artista.id} onChange={this.handleArtistaChange} />
          </div>

          <div className='grid-item item-s-12 item-l-8 margin-bottom-basic'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='materials'>Materiales</label></h4>
            <input
              id='materials'
              name='materials'
              type='text'
              disabled={this.state.isLoading}
              value={this.state.materials}
              onChange={ event => this.setState({ materials: event.target.value })}
            />
          </div>

          <div className='grid-item item-s-12 item-m-6 margin-bottom-basic'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='dimensions'>Dimensiones</label></h4>
            <input
              id='dimensions'
              name='dimensions'
              type='text'
              disabled={this.state.isLoading}
              value={this.state.dimensions}
              onChange={ event => this.setState({ dimensions: event.target.value })}
            />
          </div>

          <div className='grid-item item-s-12 item-m-6 margin-bottom-basic'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='tecnica'>Técnica</label></h4>
            <div className='select-wrapper'>
              <select
                id='tecnica'
                name='tecnica'
                disabled={this.state.isLoading}
                onChange={(event) => this.handleTecnicaChange(event.target.options[event.target.selectedIndex].value)}
                value={this.state.tecnica}
              >
                <option value=''></option>
                { Object.keys(TECNICAS).map(tecnica =>
                  <option key={tecnica} value={tecnica}>{TECNICAS[tecnica]}</option>
                )}
              </select>
            </div>
          </div>
        </div>

        <ImageUploads
          title={'Imagenes'}
          images={this.state.images}
          updateImages={this.handleUploadsChange}
          storagePath={this.storagePath}
          path={this.path}
          disabled={this.state.isLoading}
          deleteFile={this.deleteImage}
          firebase={this.props.firebase}
          dropzone={{
            accept: 'image/jpeg, image/png',
            multiple: this.multipleUploads,
          }}
        />

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-12'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='notesEditor'>Información adicional</label></h4>
            <Editor
              id='notesEditor'
              editorState={this.state.notesEditorState}
              onEditorStateChange={this.handleNotesEditorChange}
              toolbar={{
                options: ['inline', 'link', 'emoji', 'history'],
                inline: {
                  options: ['bold', 'italic', 'strikethrough'],
                },
                emoji: {
                  emojis: EMOJIS,
                }
              }}
            />
          </div>
        </div>

        <div className='grid-row margin-bottom-basic justify-end'>
          <div className='grid-item'>
            <button className='button' onClick={() => this.props.id ? this.updateObra() : this.addObra()}>
              Guardar{ this.props.id ? '' : ' Nuevo'}
            </button>
          </div>
        </div>

      </form>
    );
  }
};

export default ObraForm;
