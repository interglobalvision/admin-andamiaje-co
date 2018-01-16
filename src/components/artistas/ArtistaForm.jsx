import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';

import { convertFromRaw, convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import EMOJIS from '../../utilities/emojis.js';

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
    bioRawContent: '',
    error: {
      message: '',
    },
    isLoading: false,
  }

  constructor(props) {
    super(props);

    // If component recieves artista as prop we merge it with initial state (used for editing)
    this.state = { ...this.state, ...props.artista };

    // Bind handlers
    this.handleEditorChange = this.handleEditorChange.bind(this);
  }

  componentDidMount() {

    // Parse content
    if (this.state.bioRawContent) {
      // Convert JSON for Editor and create with content
      const contentState = convertFromRaw(JSON.parse(this.state.bioRawContent));
      this.setState({
        bioEditorState: EditorState.createWithContent(contentState),
      });
    } else {
      // No saved JSON. Create Editor without content
      this.setState({
        bioEditorState: EditorState.createEmpty(),
      });
    }

  }

  addArtista() {
    const { name, active, country, gallery, galleryUrl, bioRawContent } = this.state;

    this.setState({ isLoading: true })

    this.props.firebase
      .push('artistas', {
        name,
        active,
        country,
        gallery,
        galleryUrl,
        bioRawContent,
      })
      .then(() => {
        this.setState({ isLoading: false })
        this.props.history.push('/artistas');
      })

  }

  updateArtista() {
    const { name, active, country, gallery, galleryUrl, bioRawContent } = this.state;

    this.setState({ isLoading: true })

    this.props.firebase
      .update(`artistas/${this.props.id}`, {
        name,
        active,
        country,
        gallery,
        galleryUrl,
        bioRawContent
      })
      .then(() => {
        this.setState({ isLoading: false })
      })

  }

  handleEditorChange(bioEditorState) {
    // Update Editor state and convert content to JSON for database
    this.setState({
      bioEditorState,
      bioRawContent: JSON.stringify(convertToRaw(bioEditorState.getCurrentContent())),
    });
  }

  render() {
    return (
      <form onSubmit={event => event.preventDefault()}>
        <div className='grid-row margin-bottom-basic justify-end'>
          <div className='grid-item'>
            <button className='button' onClick={() => this.props.id ? this.updateArtista() : this.addArtista()}>
              Guardar{ this.props.id ? '' : ' Nuevo'}
            </button>
          </div>
        </div>

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-12'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='name'>Nombre</label></h4>
            <input
              id='name'
              name='name'
              ref={ ref => this.name = ref }
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
                ref={ ref => this.published = ref }
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
              ref={ ref => this.country = ref }
              type='text'
              disabled={this.state.isLoading}
              value={this.state.country}
              onChange={ event => this.setState({ country: event.target.value })}
            />
          </div>
        </div>

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-12'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='gallery'>Pagina web de Galeria</label></h4>
            <input
              id='gallery'
              name='gallery'
              ref={ ref => this.gallery = ref }
              type='text'
              disabled={this.state.isLoading}
              value={this.state.gallery}
              onChange={ event => this.setState({ gallery: event.target.value })}
            />
          </div>
        </div>

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-12'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='galleryUrl'>Galleria URL</label></h4>
            <input
              id='galleryUrl'
              name='galleryUrl'
              ref={ ref => this.gallery = ref }
              type='url'
              disabled={this.state.isLoading}
              value={this.state.galleryUrl}
              onChange={ event => this.setState({ galleryUrl: event.target.value })}
            />
          </div>
        </div>

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-12'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='editor'>Bio</label></h4>
            <Editor
              id='editor'
              editorState={this.state.bioEditorState}
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

export default ArtistaForm;
