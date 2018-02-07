import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';
import { ToastrOptionsConfirm } from '../../utilities/toastr.js';

class ArtistaPortfolio extends Component {
  state = {
    title: '',
    year: '',
    dimensions: '',
  }

  constructor(props) {
    super(props);

    // Bind
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
  }

  addItem() {
    const { title, year, dimensions } = this.state;

    // Append new item
    this.props.handlePortfolioChange([
      ...this.props.items,
      {
        title,
        year,
        dimensions,
      }
    ]);

    // Clean form
    this.setState({
      title: '',
      year: '',
      dimensions: '',
    });
  }

  removeItem(key) {
    debugger;
    const { items } = this.props;
    this.props.handlePortfolioChange(
      items.slice(0, key).concat(items.slice(key + 1))
    );
  }

  render() {
    return (
      <section>
        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-12'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'>Portafolio</h4>
          </div>
        </div>

        <div className='grid-row margin-bottom-basic'>
          {this.props.items.map( (item, key) => (
          <div key={key} className='grid-item item-s-4 margin-bottom-basic'>
            <h4>{item.title}, {item.year}</h4>
            <p>{item.dimensions}</p>
            <button type='button' onClick={() => toastr.confirm('¿Seguro que deseas eliminar esta entrada del portafolio?', ToastrOptionsConfirm(this.removeItem, key))}>Eliminar</button>
          </div>
          ))}
          <div className='grid-item item-s-4 margin-bottom-basic'>
            <label htmlFor='title'>
              Título
            </label>
            <input
              id='title'
              name='title'
              type='text'
              value={this.state.title}
              disabled={this.state.isLoading}
              onChange={ event => this.setState({ title: event.target.value })}
            />
            <label htmlFor='year'>
              Año
            </label>
            <input
              id='title'
              name='title'
              type='text'
              value={this.state.year}
              disabled={this.state.isLoading}
              onChange={ event => this.setState({ year: event.target.value })}
            />
            <label htmlFor='dimensions'>
              Dimensiones
            </label>
            <input
              id='dimensions'
              name='dimensions'
              type='text'
              value={this.state.dimensions}
              disabled={this.state.isLoading}
              onChange={ event => this.setState({ dimensions: event.target.value })}
            />
            <button type='button' className='button' onClick={this.addItem}>
              Agregar
            </button>
          </div>
        </div>
      </section>
    );
  }
}

export default ArtistaPortfolio;
