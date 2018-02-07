import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import urlParser from "js-video-url-parser";

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Uploads from '../fields/Uploads';

import { ParseEditorContent, emptyEditorState } from '../../utilities/editor';
import EMOJIS from '../../utilities/emojis.js';

import { ToastrOptionsSuccess, ToastrOptionsError } from '../../utilities/toastr.js';

@firebaseConnect()
@withRouter
class ArtistaForm extends Component {

  state = {
    active: false,
    name: '',
    country: '',
    gallery: '',
    galleryUrl: '',
    bioEditorState: '',
    bioRawContent: emptyEditorState,
    cvEditorState: '',
    cvRawContent: emptyEditorState,
    images: [],
    video: {
      url: '',
    },
    error: {
      message: '',
    },
    isLoading: false,
  }

  // Uploads
  storagePath = 'uploads'; // path in the storage
  path = 'uploads'; // path in the db
  multipleUploads = false;

  constructor(props) {
    super(props);

    // If component recieves artista as prop we merge it with initial state (used for editing)
    this.state = { ...this.state, ...props.artista };

    // Bind handlers
    this.handleBioEditorChange = this.handleBioEditorChange.bind(this);
    this.handleCvEditorChange = this.handleCvEditorChange.bind(this);
    this.handleUploadsChange = this.handleUploadsChange.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }

  componentWillMount() {
    this.setState({
      bioEditorState: ParseEditorContent(this.state.bioRawContent),
      cvEditorState: ParseEditorContent(this.state.cvRawContent),
    });
  }

  addArtista() {
    const { name, active, country, gallery, galleryUrl, bioRawContent, cvRawContent, images, video } = this.state;

    this.setState({ isLoading: true })

    this.props.firebase
      .push('artistas', {
        name,
        active,
        country,
        gallery,
        galleryUrl,
        bioRawContent,
        cvRawContent,
        images,
        video,
      })
      .then(() => {
        this.setState({ isLoading: false });
        this.props.history.push('/artistas');

        // Display success toast
        toastr.success('Éxito', 'Artista creado', ToastrOptionsSuccess);
      })

  }

  updateArtista() {
    const { name, active, country, gallery, galleryUrl, bioRawContent, cvRawContent, images, video } = this.state;

    this.setState({ isLoading: true })

    this.props.firebase
      .update(`artistas/${this.props.id}`, {
        name,
        active,
        country,
        gallery,
        galleryUrl,
        bioRawContent,
        cvRawContent,
        images,
        video,
      })
      .then(() => {
        this.setState({ isLoading: false });

        // Display success toast
        toastr.success('Éxito', 'Artista actualizado', ToastrOptionsSuccess);
      })

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

        // If updating a Noticia, update only `images` in the db entry
        if (this.props.id) {
          return this.props.firebase
            .update(`noticias/${this.props.id}`, {
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

  handleBioEditorChange(bioEditorState) {
    // Update Editor state and convert content to JSON for database
    this.setState({
      bioEditorState,
      bioRawContent: JSON.stringify(convertToRaw(bioEditorState.getCurrentContent())),
    });
  }

  handleCvEditorChange(cvEditorState) {
    // Update Editor state and convert content to JSON for database
    this.setState({
      cvEditorState,
      cvRawContent: JSON.stringify(convertToRaw(cvEditorState.getCurrentContent())),
    });
  }

  handleVideoChange(url) {
    const videoData = urlParser.parse(url);

    if(videoData) {
      const { provider, id }  = videoData;

      this.setState({
        video: {
          id,
          url,
          provider,
        }
      });
    } else {
      this.setState({
        video: {
          url,
          id: '',
          provider: '',
        }
      });

      toastr.warning('Error', 'El link del video no es correcto', ToastrOptionsError);
    }
  }

  handleUploadsChange(images) {

    // Append images to state
    this.setState({
      images: [...this.state.images, ...images]
    });
  }

  render() {
    return (
      <form onSubmit={event => event.preventDefault()}>
        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-12'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='name'>Nombre</label></h4>
            <input
              id='name'
              name='name'
              type='text'
              disabled={this.state.isLoading}
              value={this.state.name}
              onChange={ event => this.setState({ name: event.target.value })}
            />
          </div>
        </div>

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='active'>Activo</label></h4>
            <div className='grid-row align-items-center'>
              <input
                id='active'
                name='active'
                type='checkbox'
                disabled={this.state.isLoading}
                checked={this.state.active}
                onChange={ event => this.setState({ active: event.target.checked })}
              />
            </div>
          </div>
        </div>

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-12'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='country'>País</label></h4>
            <input
              id='country'
              name='country'
              type='text'
              disabled={this.state.isLoading}
              value={this.state.country}
              onChange={ event => this.setState({ country: event.target.value })}
            />
          </div>
        </div>

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-12'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='gallery'>Galería</label></h4>
            <input
              id='gallery'
              name='gallery'
              type='text'
              disabled={this.state.isLoading}
              value={this.state.gallery}
              onChange={ event => this.setState({ gallery: event.target.value })}
            />
          </div>
        </div>

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-12'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='galleryUrl'>Pagina web de Galería</label></h4>
            <input
              id='galleryUrl'
              name='galleryUrl'
              type='url'
              disabled={this.state.isLoading}
              value={this.state.galleryUrl}
              onChange={ event => this.setState({ galleryUrl: event.target.value })}
            />
          </div>
        </div>

       <Uploads
          title={'Foto de perfil'}
          files={this.state.images}
          onChange={this.handleUploadsChange}
          storagePath={this.storagePath}
          path={this.path}
          disabled={this.state.isLoading}
          deleteFile={this.deleteImage}
          dropzone={{
            accept: 'image/jpeg, image/png',
            multiple: this.multipleUploads,
          }}
        />

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-12'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='editor'>Bio</label></h4>
            <Editor
              id='editor'
              editorState={this.state.bioEditorState}
              onEditorStateChange={this.handleBioEditorChange}
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

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-12'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='editor'>CV</label></h4>
            <Editor
              id='editor'
              editorState={this.state.cvEditorState}
              onEditorStateChange={this.handleCvEditorChange}
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

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-12'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='video'>Video</label></h4>
            <input
              id='video'
              name='video'
              type='text'
              disabled={this.state.isLoading}
              value={this.state.video.url}
              onChange={ event => this.handleVideoChange(event.target.value)}
            />
          </div>
        </div>

        <div className='grid-row margin-bottom-basic justify-end'>
          <div className='grid-item'>
            <button className='button' onClick={() => this.props.id ? this.updateArtista() : this.addArtista()}>
              Guardar{ this.props.id ? '' : ' Nuevo'}
            </button>
          </div>
        </div>
      </form>
    );
  }
};

export default ArtistaForm;
