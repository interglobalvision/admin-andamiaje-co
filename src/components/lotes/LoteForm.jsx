import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import ArtistaSelectContainer from '../../containers/artistas/ArtistaSelectContainer';

import ObrasGroupContainer from '../../containers/obras/ObrasGroupContainer';

@firebaseConnect()
@withRouter
class LoteForm extends Component {

  state = {
    title: '',
    price: '',
    artista: '',
    images: '',
    obras: '',
    obrasGroup: [],
    medium: '',
    error: {
      message: '',
    },
    isLoading: false,
  }

  constructor(props) {
    super(props);

    // If component recieves lote as prop we merge it with initial state (used for editing)
    this.state = { ...this.state, ...props.lote };

    // Bind
    this.handleArtistaChange = this.handleArtistaChange.bind(this);
    this.addObraToGroup = this.addObraToGroup.bind(this);

  }

  addLote() {
    const { title, price, artista, images, obras, obrasGroup, medium } = this.state;

    this.setState({ isLoading: true })

    this.props.firebase
      .push('lotes', {
        title,
        price,
        artista,
        images,
        obras,
        obrasGroup,
        medium,
      })
      .then(() => {
        this.setState({ isLoading: false })
        this.props.history.push('/lotes');
      })

  }

  updateLote() {
    const { title, price, artista, images, obras, obrasGroup, medium } = this.state;

    this.setState({ isLoading: true })

    this.props.firebase
      .update(`lotes/${this.props.id}`, {
        title,
        price,
        artista,
        images,
        obras,
        obrasGroup,
        medium,
      })
      .then(() => {
        this.setState({ isLoading: false })
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

  addObraToGroup(selectedObra) {
    console.log(selectedObra);
    this.setState({
      obrasGroup: [...this.state.obrasGroup, selectedObra]
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
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='price'>Price</label></h4>
            <div className='grid-row align-items-center'>
              <input
                id='price'
                name='price'
                type='text'
                disabled={this.state.isLoading}
                value={this.state.price}
                onChange={ event => this.setState({ price: event.target.value })}
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
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='images'>images</label></h4>
            <input
              id='images'
              name='images'
              type='text'
              disabled={this.state.isLoading}
              value={this.state.images}
              onChange={ event => this.setState({ images: event.target.value })}
            />
          </div>
        </div>

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-12'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='obras'>Obras</label></h4>
              <ObrasGroupContainer onChange={this.addObraToGroup} selectedObras={this.state.obrasGroup} />
          </div>
        </div>

        <div className='grid-row margin-bottom-basic justify-end'>
          <div className='grid-item'>
            <button className='button' onClick={() => this.props.id ? this.updateLote() : this.addLote()}>
              Guardar{ this.props.id ? '' : ' Nuevo'}
            </button>
          </div>
        </div>

      </form>
    );
  }
};

export default LoteForm;
