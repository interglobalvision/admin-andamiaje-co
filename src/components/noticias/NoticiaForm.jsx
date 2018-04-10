import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

import DatePicker from 'react-datepicker';
import moment from 'moment';
import getYouTubeID from 'get-youtube-id';

import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import ArtistaSelectContainer from '../../containers/artistas/ArtistaSelectContainer';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import ImageUploads from '../fields/ImageUploads';
import { ParseEditorContent, emptyEditorState } from '../../utilities/editor';
import EMOJIS from '../../utilities/emojis';

import { ToastrOptionsSuccess, ToastrOptionsError } from '../../utilities/toastr.js';
import { getVimeoData, parseVimeoRedirectUrl } from '../../utilities/vimeo.js';

import { setIsLoading, setIsLoaded } from '../../redux/actions/loadingStatusActions'

const mapDispatchToProps = dispatch =>  ({
  setIsLoaded: () => dispatch(setIsLoaded()),
  setIsLoading: () => dispatch(setIsLoading()),
});

@firebaseConnect()
@withRouter
@connect(null, mapDispatchToProps)
class NoticiaForm extends Component {

  state = {
    published: false,
    publishDate: '',
    title: '',
    artista: {},
    editorState: '',
    rawContent: emptyEditorState,
    images: [],
    video: {
      url: '',
    },
    vimeo: {
      id: '',
    },
    error: {
      message: '',
    },
    isLoading: false,
  }

  // Uploads
  multipleUploads = false;

  constructor(props) {
    super(props);

    // If component recieves noticia as prop we merge it with initial state (used for editing)
    this.state = { ...this.state, ...props.noticia };

    // Bind handlers
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleVideoChange = this.handleVideoChange.bind(this);
    this.handleUploadsChange = this.handleUploadsChange.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.handleArtistaChange = this.handleArtistaChange.bind(this);
    this.handleVimeoChange = this.handleVimeoChange.bind(this);
    this.handleVimeoData = this.handleVimeoData.bind(this);
  }

  componentWillMount() {

    // Parse date
    if (this.state.publishDate) {
      this.setState({
        publishDateDisplay: moment(this.state.publishDate),
      });
    }

    // Parse content
    this.setState({
      editorState: ParseEditorContent(this.state.rawContent),
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

  addNoticia() {
    const {
      title,
      rawContent,
      published,
      publishDate,
      video,
      images,
      artista,
      vimeo,
    } = this.state;

    const createdDate = Date.now();

    this.setState({ isLoading: true })
    this.props.setIsLoading();

    this.props.firebase
      .push('noticias', {
        createdDate,
        title,
        rawContent,
        published,
        publishDate,
        video,
        images,
        artista,
        vimeo,
      })
      .then(() => {
        this.setState({ isLoading: false })
        this.props.setIsLoaded();
        this.props.history.push('/noticias');

        // Display success toast
        toastr.success('Éxito', 'Noticia creada', ToastrOptionsSuccess);
      })

  }

  updateNoticia() {
    const {
      title,
      rawContent,
      published,
      publishDate,
      images,
      video,
      artista,
      vimeo,
    } = this.state;

    this.setState({ isLoading: true })
    this.props.setIsLoading();

    this.props.firebase
      .update(`noticias/${this.props.id}`, {
        title,
        rawContent,
        published,
        publishDate,
        video,
        images,
        artista,
        vimeo,
      })
      .then(() => {
        this.setState({ isLoading: false })
        this.props.setIsLoaded();

        // Display success toast
        toastr.success('Éxito', 'Noticia actualizada', ToastrOptionsSuccess);
      })

  }

  handleDateChange(date) {
    if (date) {
      this.setState({
        publishDateDisplay: date,
        publishDate: date.valueOf(),
      });
    } else {
      this.setState({
        publishDateDisplay: null,
        publishDate: null,
      });
    }
  }

  handleEditorChange(editorState) {
    // Update Editor state and convert content to JSON for database
    this.setState({
      editorState,
      rawContent: JSON.stringify(convertToRaw(editorState.getCurrentContent())),
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

  handleArtistaChange({id, name}) {
    this.setState({
      artista: {
        id,
        name,
      },
    });
  }

  render() {
    return (
      <form onSubmit={event => event.preventDefault()}>
        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-6 item-m-4'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label className='font-size-small' htmlFor='datepicker'>Publicación</label></h4>
            <DatePicker
              id='datepicker'
              selected={this.state.publishDateDisplay /*this is a moment object*/}
              onChange={this.handleDateChange}
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={15}
              dateFormat='LLL'
              locale='es'
              placeholderText='Fecha de publicación'
              popperPlacement='bottom-start'
              popperModifiers={{
                offset: {
                  enabled: true,
                  offset: '0px, 12px'
                },
                preventOverflow: {
                  enabled: true,
                  escapeWithReference: false,
                  boundariesElement: 'viewport'
                }
              }}
            />
          </div>
          <div className='grid-item'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'>Estado</h4>
            <div className='grid-row align-items-center'>
              <input
                id='published'
                name='published'
                type='checkbox'
                disabled={this.state.isLoading}
                checked={this.state.published}
                onChange={ event => this.setState({ published: event.target.checked })}
              />
              <label htmlFor='published' className='font-size-small'>Publicado</label>
            </div>
          </div>
        </div>

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-12'>
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
        </div>

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-12'>
            <Editor
              id='editor'
              editorState={this.state.editorState}
              onEditorStateChange={this.handleEditorChange}
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
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='artista'>Artista</label></h4>
            <ArtistaSelectContainer value={this.state.artista.id} onChange={this.handleArtistaChange} />
          </div>
        </div>

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

       <ImageUploads
          title={'Imagen Principal'}
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

        <div className='grid-row margin-bottom-basic justify-end'>
          <div className='grid-item'>
            <button className='button' onClick={() => this.props.id ? this.updateNoticia() : this.addNoticia()}>
              Guardar{ this.props.id ? '' : ' Nueva'}
            </button>
          </div>
        </div>
      </form>
    );
  }
};

export default NoticiaForm;
