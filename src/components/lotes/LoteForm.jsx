import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; // ES6
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import ArtistaSelectContainer from '../../containers/artistas/ArtistaSelectContainer';
import ObrasGroupContainer from '../../containers/obras/ObrasGroupContainer';

import { PRICES } from '../../utilities/constants.js';
import { ToastrOptionsSuccess } from '../../utilities/toastr.js';

import { setIsLoading, setIsLoaded } from '../../redux/actions/loadingStatusActions';

const mapDispatchToProps = dispatch =>  ({
  setIsLoaded: () => dispatch(setIsLoaded()),
  setIsLoading: () => dispatch(setIsLoading()),
});

@firebaseConnect()
@withRouter
@connect(null, mapDispatchToProps)
class LoteForm extends Component {

  state = {
    title: '',
    price: '',
    artista: {
      id: '',
      name: '',
    },
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

    this.handleOnGroupChange = this.handleOnGroupChange.bind(this);
  }

  addLote() {
    const { title, price, artista, obras, tecnica } = this.state;

    this.setState({ isLoading: true })
    this.props.setIsLoading();

    this.props.firebase
      .push('lotes', {
        title,
        price,
        artista,
        obras,
        tecnica,
      })
      .then(() => {
        this.setState({ isLoading: false })
        this.props.setIsLoaded();
        this.props.history.push('/lotes');

        // Display success toast
        toastr.success('Éxito', 'Lote creado', ToastrOptionsSuccess);
      })

  }

  updateLote() {
    const { title, price, artista, obras, tecnica } = this.state;

    this.setState({ isLoading: true })
    this.props.setIsLoading();

    this.props.firebase
      .update(`lotes/${this.props.id}`, {
        title,
        price,
        artista,
        obras,
        tecnica,
      })
      .then(() => {
        this.setState({ isLoading: false })
        this.props.setIsLoaded();

        // Display success toast
        toastr.success('Éxito', 'Lote actualizado', ToastrOptionsSuccess);
      })

  }

  handleArtistaChange({id, name}) {
    if(id !== undefined || id !== '') {
      this.setState({
        artista: {
          id,
          name,
        },
      });
    }
  }

  handleOnGroupChange(obras) {
    const tecnica = this.getTecnicas(obras);

    this.setState({
      obras,
      tecnica
    });
  }

  getTecnicas(obras) {
    const tecnicas = obras.map((obra) => {
      if (obra.tecnica !== '' || obra.tecnica !== undefined) {
        return obra.tecnica;
      }
    });

    return tecnicas;
  }

  render() {
    return (
      <form onSubmit={event => event.preventDefault()}>

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'>Precio</h4>
            { PRICES.map( price => (
              <div key={`price-${price.toString().replace('.','-')}`} className='grid-row align-items-center margin-bottom-micro'>
                <input
                  id={`price-${price.toString().replace('.','-')}`}
                  name='price'
                  type='radio'
                  value={price}
                  disabled={this.state.isLoading}
                  checked={this.state.price === price}
                  onChange={ event => this.setState({ price: parseFloat(event.target.value ) }) }
                />
                <label htmlFor={`price-${price.toString().replace('.','-')}`} className='font-size-small'>{price}</label>
              </div>
            ))}
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
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='artista'>Artista</label></h4>
            <ArtistaSelectContainer value={this.state.artista.id} onChange={this.handleArtistaChange} />
          </div>
        </div>

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-12'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='obras'>Obras</label></h4>
          </div>
          <div className='grid-item item-s-12 no-gutter'>
            <ObrasGroupContainer onChange={this.handleOnGroupChange} selectedObras={this.state.obras} />
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

LoteForm.propTypes = {
  id: PropTypes.string,
  lote: PropTypes.shape({
    artista: PropTypes.object,
    obras: PropTypes.array,
    price: PropTypes.number,
    title: PropTypes.string,
  }),
};

export default LoteForm;
