import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import Uploads from './Uploads';
import ParseEditorContent from '../utilities/editor';
import EMOJIS from '../utilities/emojis';

@firebaseConnect()
@withRouter
class NoticiaForm extends Component {

  state = {
    published: false,
    publishDate: '',
    title: '',
    editorState: '',
    rawContent: '',
    images: [],
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

    // If component recieves noticia as prop we merge it with initial state (used for editing)
    this.state = { ...this.state, ...props.noticia };

    // Bind handlers
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
    this.handleUploadsChange = this.handleUploadsChange.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
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

        // Filter out the deleted image fromt the current state
        const images = this.state.images.filter( image => {
          return image.fullPath !== deletedImage.path;
        });

        // Save the new state
        this.setState({ images });

        // Update only `images` in the db entry
        this.props.firebase
          .update(`noticias/${this.props.id}`, {
            images,
          })
          .then(() => {
            // Unset Loading
            this.setState({ isLoading: false })
          })

      })
      .catch( error => console.log(error) );
  }

  addNoticia() {
    const { title, rawContent, published, publishDate, images } = this.state;

    const createdDate = Date.now();

    this.setState({ isLoading: true })

    this.props.firebase
      .push('noticias', {
        createdDate,
        title,
        rawContent,
        published,
        publishDate,
        images,
      })
      .then(() => {
        this.setState({ isLoading: false })
        this.props.history.push('/noticias');
      })

  }

  updateNoticia() {
    const { title, rawContent, published, publishDate, images } = this.state;

    this.setState({ isLoading: true })

    this.props.firebase
      .update(`noticias/${this.props.id}`, {
        title,
        rawContent,
        published,
        publishDate,
        images,
      })
      .then(() => {
        this.setState({ isLoading: false })
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
          {this.state.images.map( image => (
            <div key={image.key} className='grid-item item-s-6 item-m-3'>
              <img src={image.downloadURL} alt="" />
              <button onClick={() => this.deleteImage(image)}>Eliminar</button>
            </div>
          ))}
          <div className='grid-item item-s-6 item-m-3'>
            <Uploads
              onChange={this.handleUploadsChange}
              storagePath={this.storagePath}
              path={this.path}
              dropzone={{
                accept: 'image/jpeg, image/png',
                multiple: false
              }}
            />
          </div>
        </div>

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
