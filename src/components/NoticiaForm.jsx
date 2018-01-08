import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';

@firebaseConnect()
@withRouter
class NoticiaForm extends Component {

  state = {
    published: false,
    title: '',
    error: {
      message: '',
    },
    isLoading: false,
  }

  constructor(props) {
    super(props);

    // If component recieves noticia as prop we merge it with initial state (used for editing)
    this.state = { ...this.state, ...props.noticia };

  }

  componentDidMunt

  addNoticia() {
    const { title, published } = this.state;

    this.setState({ isLoading: true })

    this.props.firebase
      .push('noticias', {
        title,
        published,
      })
      .then(() => {
        this.setState({ isLoading: false })
        this.props.history.push('/noticias');
      })

  }

  updateNoticia() {
    const { title, published } = this.state;

    this.setState({ isLoading: true })

    this.props.firebase
      .update(`noticias/${this.props.id}`, {
        title,
        published,
      })
      .then(() => {
        this.setState({ isLoading: false })
      })

  }

  render() {
    return (
      <form onSubmit={event => event.preventDefault()}>
        <div className='grid-row justify-end'>
          <div className='grid-item item-s-3'>
            <button onClick={() => this.props.id ? this.updateNoticia() : this.addNoticia()}>
              Guardar{ this.props.id ? '' : ' Nueva'}
            </button>
          </div>
        </div>
        <div className='grid-rowd'>
          <div className='grid-item item-s-2'>
            <h4>Estado</h4>
            <input
              id='published'
              name='published'
              ref={ ref => this.published = ref }
              type='checkbox'
              disabled={this.state.isLoading}
              checked={this.state.published}
              onChange={ event => this.setState({ published: event.target.checked })}
            />
            <label htmlFor='published'>Publicado</label>
          </div>
        </div>
        <div className='grid-rowd'>
          <div className='grid-item item-s-12'>
            <h4><label htmlFor='title'>Título</label></h4>
            <input
              id='title'
              name='title'
              ref={ ref => this.title = ref }
              type='text'
              disabled={this.state.isLoading}
              value={this.state.title}
              onChange={ event => this.setState({ title: event.target.value })}
            />
          </div>
        </div>
      </form>
    );
  }
};

export default NoticiaForm;
