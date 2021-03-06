import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import getYouTubeID from 'get-youtube-id';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import ArtistaPortfolio from './ArtistaPortfolio';
import ImageUploads from '../fields/ImageUploads';

import { ParseEditorContent, emptyEditorState } from '../../utilities/editor';
import EMOJIS from '../../utilities/emojis.js';

import { ToastrOptionsSuccess, ToastrOptionsError } from '../../utilities/toastr.js';
import { getVimeoData, parseVimeoRedirectUrl } from '../../utilities/vimeo.js';

import { setIsLoading, setIsLoaded } from '../../redux/actions/loadingStatusActions';

const mapDispatchToProps = dispatch =>  ({
  setIsLoaded: () => dispatch(setIsLoaded()),
  setIsLoading: () => dispatch(setIsLoading()),
});

@firebaseConnect()
@withRouter
@connect(null, mapDispatchToProps)
class ArtistaForm extends Component {

  state = {
    active: false,
    name: '',
    country: '',
    gallery: '',
    galleryUrl: '',
    websiteUrl: '',
    bioEditorState: '',
    bioRawContent: emptyEditorState,
    cvEditorState: '',
    cvRawContent: emptyEditorState,
    images: [],
    video: {
      url: '',
    },
    vimeo: {
      id: '',
    },
    portfolio: [],
    vimeoId: '',
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
    this.handleVideoChange = this.handleVideoChange.bind(this);
    this.handleUploadsChange = this.handleUploadsChange.bind(this);
    this.handlePortfolioChange = this.handlePortfolioChange.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.handleVimeoChange = this.handleVimeoChange.bind(this);
    this.handleVimeoData = this.handleVimeoData.bind(this);
  }

  componentWillMount() {
    this.setState({
      bioEditorState: ParseEditorContent(this.state.bioRawContent),
      cvEditorState: ParseEditorContent(this.state.cvRawContent),
    });
  }

  addArtista() {
    const {
      name,
      active,
      country,
      gallery,
      galleryUrl,
      websiteUrl,
      bioRawContent,
      cvRawContent,
      images,
      video,
      portfolio,
      vimeo,
    } = this.state;

    this.setState({ isLoading: true })
    this.props.setIsLoading();

    this.props.firebase
      .push('artistas', {
        name,
        active,
        country,
        gallery,
        galleryUrl,
        websiteUrl,
        bioRawContent,
        cvRawContent,
        images,
        video,
        portfolio,
        vimeo,
      })
      .then(() => {
        this.setState({ isLoading: false });
        this.props.setIsLoaded();
        this.props.history.push('/artistas');

        // Display success toast
        toastr.success('Éxito', 'Artista creado', ToastrOptionsSuccess);
      })

  }

  updateArtista() {
    const {
      name,
      active,
      country,
      gallery,
      galleryUrl,
      websiteUrl,
      bioRawContent,
      cvRawContent,
      images,
      video,
      portfolio,
      vimeo,
    } = this.state;

    this.setState({ isLoading: true })
    this.props.setIsLoading();

    this.props.firebase
      .update(`artistas/${this.props.id}`, {
        name,
        active,
        country,
        gallery,
        galleryUrl,
        websiteUrl,
        bioRawContent,
        cvRawContent,
        images,
        video,
        portfolio,
        vimeo,
      })
      .then(() => {
        this.setState({ isLoading: false });
        this.props.setIsLoaded();

        // Display success toast
        toastr.success('Éxito', 'Artista actualizado', ToastrOptionsSuccess);
      })

  }

  deleteImage(image) {

    // Set Loading
    this.setState({ isLoading: true })
    this.props.setIsLoading();

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
        this.props.setIsLoaded();
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
    const id = getYouTubeID(url);

    if(id) {

      this.setState({
        video: {
          id,
          url,
          provider: 'youtube',
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

  handleVimeoChange(id) {
    let newState = this.state;

    newState.vimeo['id'] = id;

    if(id !== undefined && id !== null && id !== '') { // If id has a value
      // Call to get the video data
      getVimeoData(id, this.handleVimeoData);

    } else {
      newState.vimeo = {
        id: ''
      };
    }

    this.setState(newState);

  }

  handleVimeoData(response) {

    // set Loading
    this.setState({ isLoading: true })

    let vimeo = this.state.vimeo;

    if (response.error) { // Something wetn wrong :(
      // unset Loading
      this.setState({ isLoading: false })

      vimeo['sources'] = {};

      const message = JSON.parse(response.error.message);

      if(message.error === 'The requested video could not be found') {
        toastr.warning('Error', 'El ID de Vimeo no es correcto', ToastrOptionsError);
      } else {
        toastr.warning('Error', 'Ha sucedido un error con Vimeo', ToastrOptionsError);
      }

    }

    if(response.body) { // We got the video data
      vimeo['sources'] = {};

      toastr.success('Éxito', `Agregado el video "${response.body.name}"`, ToastrOptionsSuccess);

      // Build an object of sources
      response.body.files.forEach( source => {
        const key = source.width !== undefined ? source.width : 'original';
        const thumb = response.body.pictures.sizes.find( size => size.width === source.width);

        if(thumb) {
          source.thumb = thumb.link_with_play_button;
        }

        vimeo['sources'][key] = source;
      });

      // unset Loading
      this.setState({ isLoading: false })

    }

    // set new state and call getVimeoRedirects
    this.setState(Object.assign({}, this.state, vimeo), this.getVimeoRedirects);
  }

  // Go thru vimeo sources and resolve their redirects, update them in the state
  getVimeoRedirects() {
    const state = this.state;

    // Sources keys aka sizes (width)
    const sourcesKeys = Object.keys(state.vimeo.sources);

    if(sourcesKeys.length) {
      // set screen Loading
      this.props.setIsLoading();

      // Uses to keep track of how many sources have been resolved
      let counter = 0;

      sourcesKeys.forEach( key => { // Check each source
        parseVimeoRedirectUrl(state.vimeo.sources[key].link, url => {
          // Make a copy of current state
          let nextState = state;

          // Update with the parsed redirect url
          nextState.vimeo.sources[key].link = url;

          // Increment counter
          counter += 1;

          // Update state
          this.setState(nextState);

          // Check if all sources have been updated
          if(counter >= sourcesKeys.length) {
            // unset screen Loading
            this.props.setIsLoaded();
          }

        });
      });
    }
  }

  handleUploadsChange(images) {
    this.setState({images});
  }

  handlePortfolioChange(portfolio) {

    // Append images to state
    this.setState({
      portfolio,
    });
  }

  render() {
    return (
      <form onSubmit={event => event.preventDefault()}>
        <div className='grid-row'>
          <div className='grid-item margin-bottom-basic'>
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

        <div className='grid-row'>
          <div className='grid-item item-s-12 item-m-6 margin-bottom-basic'>
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

          <div className='grid-item item-s-12 item-m-6 margin-bottom-basic'>
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

          <div className='grid-item item-s-12 item-m-6 margin-bottom-basic'>
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

          <div className='grid-item item-s-12 item-m-6 margin-bottom-basic'>
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

          <div className='grid-item item-s-12 item-m-6 margin-bottom-basic'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='websiteUrl'>Pagina web de artista</label></h4>
            <input
              id='websiteUrl'
              name='websiteUrl'
              type='url'
              disabled={this.state.isLoading}
              value={this.state.websiteUrl}
              onChange={ event => this.setState({ websiteUrl: event.target.value })}
            />
          </div>
        </div>

       <ImageUploads
          title={'Foto de perfil'}
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

        <div className='grid-row'>
          <div className='grid-item item-s-12 item-m-8 margin-bottom-basic'>
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

          <div className='grid-item item-s-12 item-m-4 margin-bottom-basic'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='video'>Vimeo ID</label></h4>
            <input
              id='vimeoId'
              name='vimeoId'
              type='text'
              disabled={this.state.isLoading}
              value={this.state.vimeo.id}
              onChange={ event => this.handleVimeoChange(event.target.value)}
            />
          </div>
        </div>

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

        <ArtistaPortfolio
          enabled={this.state.loading}
          items={this.state.portfolio}
          handlePortfolioChange={this.handlePortfolioChange}
        />

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
