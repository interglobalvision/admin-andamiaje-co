import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';

import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import ParseEditorContent from '../../utilities/editor.js';
import EMOJIS from '../../utilities/emojis.js';

@firebaseConnect()
@withRouter
class UsuarioForm extends Component {

  state = {
    published: false,
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

    // If component recieves usuario as prop we merge it with initial state (used for editing)
    this.state = { ...this.state, ...props.usuario };

    // Bind handlers
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  componentWillMount() {

    // Parse content
    this.setState({
      editorState: ParseEditorContent(this.state.rawContent),
    });
  }

  addUsuario() {
    const { title, rawContent, published } = this.state;

    const createdDate = Date.now();

    this.setState({ isLoading: true })

    this.props.firebase
      .push('usuarios', {
        title,
        rawContent,
        published,
        createdDate
      })
      .then(() => {
        this.setState({ isLoading: false })
        this.props.history.push('/usuarios');
      })

  }

  updateUsuario() {
    const { title, rawContent, published } = this.state;

    this.setState({ isLoading: true })

    this.props.firebase
      .update(`usuarios/${this.props.id}`, {
        title,
        rawContent,
        published
      })
      .then(() => {
        this.setState({ isLoading: false })
      })

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
        <div className='grid-row margin-bottom-basic justify-end'>
          <div className='grid-item'>
            <button className='button' onClick={() => this.props.id ? this.updateUsuario() : this.addUsuario()}>
              Guardar{ this.props.id ? '' : ' Nueva'}
            </button>
          </div>
        </div>

        <div className='grid-row margin-bottom-basic'>
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
      </form>
    );
  }
};

export default UsuarioForm;
