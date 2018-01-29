import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import ArtistaSelectContainer from '../../containers/artistas/ArtistaSelectContainer';

import ObrasGroupContainer from '../../containers/obras/ObrasGroupContainer';

import { ToastrOptionsSuccess } from '../../utilities/toastr.js';

@firebaseConnect()
@withRouter
class LoteForm extends Component {

  state = {
    title: '',
    price: '',
    artista: '',
    obras: [],
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
    this.removeObraFromGroup = this.removeObraFromGroup.bind(this);

  }

  addLote() {
    const { title, price, artista, obras } = this.state;

    this.setState({ isLoading: true })

    this.props.firebase
      .push('lotes', {
        title,
        price,
        artista,
        obras,
      })
      .then(() => {
        this.setState({ isLoading: false })
        this.props.history.push('/lotes');

        // Display success toast
        toastr.success('Éxito', 'Lote creado', ToastrOptionsSuccess);
      })

  }

  updateLote() {
    const { title, price, artista, obras } = this.state;

    this.setState({ isLoading: true })

    this.props.firebase
      .update(`lotes/${this.props.id}`, {
        title,
        price,
        artista,
        obras,
      })
      .then(() => {
        this.setState({ isLoading: false })

        // Display success toast
        toastr.success('Éxito', 'Lote actualizado', ToastrOptionsSuccess);
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
    this.setState({
      obras: [...this.state.obras, selectedObra]
    });
  }

  removeObraFromGroup(id) {
    this.setState( currentState => ({
      obras: currentState.obras.filter( obra => obra.id !== id )
    }));
  }

  render() {
    return (
      <form onSubmit={event => event.preventDefault()}>

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'>Price</h4>
            <div className='grid-row align-items-center margin-bottom-micro'>
              <input
                id='price-2-5'
                name='price'
                type='radio'
                value='2.5'
                disabled={this.state.isLoading}
                checked={this.state.price === '2.5'}
                onChange={ event => this.setState({ price: event.target.value }) }
              />
              <label htmlFor='price-2-5' className='font-size-small'>2.5</label>
            </div>
            <div className='grid-row align-items-center margin-bottom-micro'>
              <input
                id='price-5'
                name='price'
                type='radio'
                value='5'
                disabled={this.state.isLoading}
                checked={this.state.price === '5'}
                onChange={ event => this.setState({ price: event.target.value }) }
              />
              <label htmlFor='price-5' className='font-size-small'>5</label>
            </div>
            <div className='grid-row align-items-center margin-bottom-micro'>
              <input
                id='price-10'
                name='price'
                type='radio'
                value='10'
                disabled={this.state.isLoading}
                checked={this.state.price === '10'}
                onChange={ event => this.setState({ price: event.target.value }) }
              />
              <label htmlFor='price-10' className='font-size-small'>10</label>
            </div>
          </div>
        </div>

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
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='artista'>Artista</label></h4>
            <ArtistaSelectContainer value={this.state.artista} onChange={this.handleArtistaChange} />
          </div>
        </div>

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-12'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='obras'>Obras</label></h4>
              <ObrasGroupContainer addObraToGroup={this.addObraToGroup} selectedObras={this.state.obras} removeObraFromGroup={this.removeObraFromGroup} />
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
