import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import 'react-datepicker/dist/react-datepicker.css';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import ParseEditorContent from '../utilities/editor.js';
import EMOJIS from '../utilities/emojis.js';

import { ToastrOptionsSuccess } from '../utilities/constants.js';

@firebaseConnect()
@withRouter
class NoticiaForm extends Component {

  state = {
    published: false,
    publishDate: '',
    title: '',
    editorState: '',
    rawContent: '',
    error: {
      message: '',
    },
    isLoading: false,
  }

  constructor(props) {
    super(props);

    // If component recieves noticia as prop we merge it with initial state (used for editing)
    this.state = { ...this.state, ...props.noticia };

    // Bind handlers
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
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

  addNoticia() {
    const { title, rawContent, published, publishDate } = this.state;

    const createdDate = Date.now();

    this.setState({ isLoading: true })

    this.props.firebase
      .push('noticias', {
        title,
        rawContent,
        published,
        publishDate,
        createdDate,
      })
      .then(() => {
        this.setState({ isLoading: false })
        this.props.history.push('/noticias');

        // Display success toast
        toastr.success('Éxito', 'Noticia creada', ToastrOptionsSuccess);
      })

  }

  updateNoticia() {
    const { title, rawContent, published, publishDate } = this.state;

    this.setState({ isLoading: true })

    this.props.firebase
      .update(`noticias/${this.props.id}`, {
        title,
        rawContent,
        published,
        publishDate
      })
      .then(() => {
        this.setState({ isLoading: false })

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
