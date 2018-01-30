import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

import LotesGroupContainer from '../../containers/lotes/LotesGroupContainer';

import { ToastrOptionsSuccess } from '../../utilities/toastr.js';

@firebaseConnect()
@withRouter
class CatalogoForm extends Component {

  state = {
    title: '',
    lotes: [],
    error: {
      message: '',
    },
    isLoading: false,
  }

  constructor(props) {
    super(props);

    // If component recieves catalogo as prop we merge it with initial state (used for editing)
    this.state = { ...this.state, ...props.catalogo };

    // Bind
    this.addLoteToGroup = this.addLoteToGroup.bind(this);
    this.removeLoteFromGroup = this.removeLoteFromGroup.bind(this);

  }

  addCatalogo() {
    const { title, lotes } = this.state;

    this.setState({ isLoading: true })

    this.props.firebase
      .push('catalogos', {
        title,
        lotes,
      })
      .then(() => {
        this.setState({ isLoading: false })
        this.props.history.push('/catalogos');

        // Display success toast
        toastr.success('Éxito', 'Catalogo creado', ToastrOptionsSuccess);
      })

  }

  updateCatalogo() {
    const { title, lotes } = this.state;

    this.setState({ isLoading: true })

    this.props.firebase
      .update(`catalogos/${this.props.id}`, {
        title,
        lotes,
      })
      .then(() => {
        this.setState({ isLoading: false })

        // Display success toast
        toastr.success('Éxito', 'Catalogo actualizado', ToastrOptionsSuccess);
      })

  }

  addLoteToGroup(selectedLote) {
    this.setState({
      lotes: [...this.state.lotes, selectedLote]
    });
  }

  removeLoteFromGroup(id) {
    this.setState( currentState => ({
      lotes: currentState.lotes.filter( lote => lote.id !== id )
    }));
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
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='lotes'>Lotes</label></h4>
            <LotesGroupContainer addLoteToGroup={this.addLoteToGroup} selectedLotes={this.state.lotes} removeLoteFromGroup={this.removeLoteFromGroup} />
          </div>
        </div>

        <div className='grid-row margin-bottom-basic justify-end'>
          <div className='grid-item'>
            <button className='button' onClick={() => this.props.id ? this.updateCatalogo() : this.addCatalogo()}>
              Guardar{ this.props.id ? '' : ' Nuevo'}
            </button>
          </div>
        </div>

      </form>
    );
  }
};

CatalogoForm.propTypes = {
  id: PropTypes.string,
  catalogo: PropTypes.shape({
    artista: PropTypes.string, // TODO: should be object
    price: PropTypes.number,
    title: PropTypes.string,
  }),
};

export default CatalogoForm;
