import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import LotesGroupContainer from '../../containers/lotes/LotesGroupContainer';

import { ToastrOptionsSuccess } from '../../utilities/toastr.js';

import 'react-datepicker/dist/react-datepicker.css';

@firebaseConnect()
@withRouter
class CatalogoForm extends Component {

  state = {
    title: '',
    lotes: [],
    startDate: '',
    saleDate: '',
    endDate: '',
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
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleSaleDateChange = this.handleSaleDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);

    this.handleOnGroupChange = this.handleOnGroupChange.bind(this);

  }

  componentWillMount() {

    // Parse dates
    if (this.state.startDate) {
      this.setState({
        startDateDisplay: moment(this.state.startDate),
      });
    }

    if (this.state.saleDate) {
      this.setState({
        saleDateDisplay: moment(this.state.saleDate),
      });
    }

    if (this.state.endDate) {
      this.setState({
        endDateDisplay: moment(this.state.endDate),
      });
    }

  }

  addCatalogo() {
    const { title, lotes, startDate, saleDate, endDate } = this.state;

    this.setState({ isLoading: true })

    this.props.firebase
      .push('catalogos', {
        title,
        lotes,
        startDate,
        saleDate,
        endDate,
      })
      .then(() => {
        this.setState({ isLoading: false })
        this.props.history.push('/catalogos');

        // Display success toast
        toastr.success('Éxito', 'Catálogo creado', ToastrOptionsSuccess);
      })

  }

  updateCatalogo() {
    const { title, lotes, startDate, saleDate, endDate } = this.state;

    this.setState({ isLoading: true })

    this.props.firebase
      .update(`catalogos/${this.props.id}`, {
        title,
        lotes,
        startDate,
        saleDate,
        endDate,
      })
      .then(() => {
        this.setState({ isLoading: false })

        // Display success toast
        toastr.success('Éxito', 'Catálogo actualizado', ToastrOptionsSuccess);
      })

  }

  handleOnGroupChange(lotes) {
    this.setState({ lotes });
  }

  handleStartDateChange(date) {
    if (date) {
      this.setState({
        startDateDisplay: date,
        startDate: date.valueOf(),
      });
    } else {
      this.setState({
        startDateDisplay: null,
        startDate: null,
      });
    }
  }

  handleSaleDateChange(date) {
    if (date) {
      this.setState({
        saleDateDisplay: date,
        saleDate: date.valueOf(),
      });
    } else {
      this.setState({
        saleDateDisplay: null,
        saleDate: null,
      });
    }
  }

  handleEndDateChange(date) {
    if (date) {
      this.setState({
        endDateDisplay: date,
        endDate: date.valueOf(),
      });
    } else {
      this.setState({
        endDateDisplay: null,
        endDate: null,
      });
    }
  }

  render() {
    return (
      <form onSubmit={event => event.preventDefault()}>
        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-4'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label className='font-size-small' htmlFor='datepicker-start'>Inicio</label></h4>
            <DatePicker
              id='datepicker-start'
              selected={this.state.startDateDisplay /*this is a moment object*/}
              onChange={this.handleStartDateChange}
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={15}
              dateFormat='LLL'
              locale='es'
              placeholderText='Fecha de inicio'
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
          <div className='grid-item item-s-4'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label className='font-size-small' htmlFor='datepicker-sale'>Subasta</label></h4>
            <DatePicker
              id='datepicker-sale'
              selected={this.state.saleDateDisplay /*this is a moment object*/}
              onChange={this.handleSaleDateChange}
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={15}
              dateFormat='LLL'
              locale='es'
              placeholderText='Fecha de subasta'
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
          <div className='grid-item item-s-4'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label className='font-size-small' htmlFor='datepicker-sale'>Fin</label></h4>
            <DatePicker
              id='datepicker-sale'
              selected={this.state.endDateDisplay /*this is a moment object*/}
              onChange={this.handleEndDateChange}
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={15}
              dateFormat='LLL'
              locale='es'
              placeholderText='Fecha final'
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
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='lotes'>Lotes</label></h4>
            <LotesGroupContainer selectedLotes={this.state.lotes} onChange={this.handleOnGroupChange} />
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
