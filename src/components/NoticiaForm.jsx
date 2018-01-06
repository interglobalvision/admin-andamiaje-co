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

  constructor({ noticia, id }) {
    super();

    // If component recieves noticia as prop we use it for initial state (used for editing)
    this.state = { ...noticia };

    // If component recieves an id as prop we will use it for saving (used for editing)
    this.id = id;
  }

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
      .update(`noticias/${this.id}`, {
        title,
        published,
      })
      .then(() => {
        this.setState({ isLoading: false })
        //this.props.history.push('/noticias');
      })

  }

  render() {
    return (
      <form onSubmit={event => event.preventDefault()}>
        <div className='grid-row justify-end'>
          <div className='grid-item item-s-3'>
            <button onClick={() => this.id ? this.updateNoticia() : this.addNoticia()}>Guardar{ this.id ? '' : ' Nueva'}</button>
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
