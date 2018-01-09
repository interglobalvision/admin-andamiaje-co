import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

@firebaseConnect()
@withRouter
class NoticiaForm extends Component {

  state = {
    published: false,
    publishDate: '',
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

    // Bind handlers
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {

    // Parse date
    if(this.state.publishDate) {
      this.setState({
        publishDateDisplay: moment(this.state.publishDate),
      });
    }

  }

  addNoticia() {
    const { title, published, publishDate } = this.state;

    this.setState({ isLoading: true })

    this.props.firebase
      .push('noticias', {
        title,
        published,
        publishDate,
      })
      .then(() => {
        this.setState({ isLoading: false })
        this.props.history.push('/noticias');
      })

  }

  updateNoticia() {
    const { title, published, publishDate } = this.state;

    this.setState({ isLoading: true })

    this.props.firebase
      .update(`noticias/${this.props.id}`, {
        title,
        published,
        publishDate
      })
      .then(() => {
        this.setState({ isLoading: false })
      })

  }

  handleDateChange(date) {
    if(date) {
      this.setState({
        publishDateDisplay: date,
        publishDate: date.valueOf(),
      });
    } else {
      this.setState({
        publishDateDisplay: null,
        publishDate: null,
      });
    }
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
        <div className='grid-row'>
          <div className='grid-item item-s-12 item-m-6 item-l-3'>
            <h4>Publicación</h4>
            <DatePicker
              selected={this.state.publishDateDisplay /*this is a moment object*/}
              onChange={this.handleDateChange}
              showTimeSelect
              timeFormat='HH:mm'
              timeIntervals={15}
              dateFormat='LLL'
              locale='es'
              placeholderText='Fecha de publicación'
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
        <div className='grid-row'>
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
