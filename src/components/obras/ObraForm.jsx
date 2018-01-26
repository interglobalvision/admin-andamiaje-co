import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import ArtistaSelectContainer from '../../containers/artistas/ArtistaSelectContainer';

import { ToastrOptionsSuccess } from '../../utilities/toastr.js';

import { convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import ParseEditorContent from '../../utilities/editor.js';
import EMOJIS from '../../utilities/emojis.js';

@firebaseConnect()
@withRouter
class ObraForm extends Component {

  state = {
    title: '',
    year: '',
    artista: '',
    materials: '',
    dimensions: '',
    medium: '',
    notesEditorState: '',
    notesRawContent: '',
    error: {
      message: '',
    },
    isLoading: false,
  }

  constructor(props) {
    super(props);

    // If component recieves obra as prop we merge it with initial state (used for editing)
    this.state = { ...this.state, ...props.obra };

    // Bind
    this.handleArtistaChange = this.handleArtistaChange.bind(this);
    this.handleNotesEditorChange = this.handleNotesEditorChange.bind(this);
  }

  componentWillMount() {

    // Parse content
    this.setState({
      notesEditorState: ParseEditorContent(this.state.notesRawContent),
    });
  }

  addObra() {
    const { title, year, artista, materials, dimensions, medium, notesRawContent } = this.state;

    this.setState({ isLoading: true })

    this.props.firebase
      .push('obras', {
        title,
        year,
        artista,
        materials,
        dimensions,
        medium,
        notesRawContent,
      })
      .then(() => {
        this.setState({ isLoading: false })
        this.props.history.push('/obras');

        // Display success toast
        toastr.success('Éxito', 'Obra creada', ToastrOptionsSuccess);
      })

  }

  updateObra() {
    const { title, year, artista, materials, dimensions, medium, notesRawContent } = this.state;

    this.setState({ isLoading: true })

    this.props.firebase
      .update(`obras/${this.props.id}`, {
        title,
        year,
        artista,
        materials,
        dimensions,
        medium,
        notesRawContent,
      })
      .then(() => {
        this.setState({ isLoading: false })

        // Display success toast
        toastr.success('Éxito', 'Obra actualizada');
      })

  }

  handleArtistaChange({artista, artistaName}) {
    if(artista !== undefined || artista !== '') {
      this.setState({
        artista,
        artistaName,
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

  render() {
    return (
      <form onSubmit={event => event.preventDefault()}>

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-12'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='title'>Title</label></h4>
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
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='year'>Year</label></h4>
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
        </div>

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-12'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='artista'>Artista</label></h4>
            <ArtistaSelectContainer value={this.state.artista} onChange={this.handleArtistaChange} />
          </div>
        </div>

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-12'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='materials'>Materials</label></h4>
            <input
              id='materials'
              name='materials'
              type='text'
              disabled={this.state.isLoading}
              value={this.state.materials}
              onChange={ event => this.setState({ materials: event.target.value })}
            />
          </div>
        </div>

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-12'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='dimensions'>Dimensions</label></h4>
            <input
              id='dimensions'
              name='dimensions'
              type='text'
              disabled={this.state.isLoading}
              value={this.state.dimensions}
              onChange={ event => this.setState({ dimensions: event.target.value })}
            />
          </div>
        </div>

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-12'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='medium'>Medium</label></h4>
            <input
              id='medium'
              name='medium'
              type='text'
              disabled={this.state.isLoading}
              value={this.state.medium}
              onChange={ event => this.setState({ medium: event.target.value })}
            />
          </div>
        </div>

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
