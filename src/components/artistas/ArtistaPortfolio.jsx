import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';

import Uploads from '../fields/Uploads';
import { ToastrOptionsConfirm } from '../../utilities/toastr.js';

class ArtistaPortfolio extends Component {
  state = {
    title: '',
    year: '',
    dimensions: '',
    images: [],
  }

  // Uploads
  storagePath = 'uploads'; // path in the storage
  path = 'uploads'; // path in the db
  multipleUploads = false;

  constructor(props) {
    super(props);

    // Bind
    this.addItem = this.addItem.bind(this);
    this.removeItem = this.removeItem.bind(this);
    this.handleUploadsChange = this.handleUploadsChange.bind(this);
  }

  addItem() {
    const { title, year, dimensions, images } = this.state;

    // Append new item
    this.props.handlePortfolioChange([
      ...this.props.items,
      {
        title,
        year,
        dimensions,
        images,
      }
    ]);

    // Clean form
    this.setState({
      title: '',
      year: '',
      dimensions: '',
      images: [],
    });
  }

  removeItem(key) {
    const { items } = this.props;

    this.props.handlePortfolioChange(
      items.slice(0, key).concat(items.slice(key + 1))
    );
  }

  handleUploadsChange(images) {
    // Append images to state
    this.setState({
      images: [...this.state.images, ...images]
    });
  }

  changeValue(index, param, value) {
    let { items } = this.props;

    items[index][param] = value;

    this.props.handlePortfolioChange(items);
  }


  render() {
    return (
      <section>
        <div className='grid-row margin-bottom-tiny'>
          <div className='grid-item item-s-12'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'>Portafolio</h4>
          </div>
        </div>

        <div className='grid-row margin-bottom-basic'>
          {this.props.items.map( (item, key) => {
            const { title, images, year, dimensions } = item;
            return (
              <article key={key} className='grid-item item-s-12 item-m-6 margin-bottom-basic artist-portfolio-item'>
                <div className='margin-bottom-micro'>
                  { images !== undefined && images[0] !== undefined && images[0].downloadURL !== undefined ? <img src={images[0].downloadURL} alt={title} className='margin-bottom-tiny' /> : '' }
                </div>

                <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor={key + '-title'}>Título</label></h4>
                <input id={key + '-title'} key={key + '-title'} type='text' value={title} onChange={e => this.changeValue(key, 'title', e.target.value)} className='margin-bottom-tiny' />

                <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor={key + '-year'}>Año</label></h4>
                <input id={key + '-year'} key={key + '-year'} type='text' value={year} onChange={e => this.changeValue(key, 'year', e.target.value)} className='margin-bottom-tiny' />

                <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor={key + '-dimensions'}>Dimensiones</label></h4>
                <input id={key + '-dimensions'} key={key + '-dimensions'} type='text' value={dimensions} onChange={e => this.changeValue(key, 'dimensions', e.target.value)} className='margin-bottom-tiny' />

                <button type='button' className='button button-small button-delete' onClick={() => toastr.confirm('¿Seguro que deseas eliminar esta entrada del portafolio?', ToastrOptionsConfirm(this.removeItem, key))}>Eliminar</button>
              </article>
            )
          })}
        </div>
        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-12 margin-bottom-basic'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'>Agregar pieza</h4>

            <Uploads
              title={'Imagenes'}
              files={this.state.images}
              onChange={this.handleUploadsChange}
              storagePath={this.storagePath}
              path={this.path}
              disabled={this.state.isLoading}
              deleteFile={this.deleteImage}
              dropzone={{
                accept: 'image/jpeg, image/png',
                multiple: this.multipleUploads,
              }}
            />

            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='title'>Título</label></h4>
            <input
              id='title'
              name='title'
              type='text'
              value={this.state.title}
              disabled={this.state.isLoading}
              onChange={ event => this.setState({ title: event.target.value })}
              className='margin-bottom-tiny'
            />

            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='year'>Año</label></h4>
            <input
              id='title'
              name='title'
              type='text'
              value={this.state.year}
              disabled={this.state.isLoading}
              onChange={ event => this.setState({ year: event.target.value })}
              className='margin-bottom-tiny'
            />

            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='dimensions'>Dimensiones</label></h4>
            <input
              id='dimensions'
              name='dimensions'
              type='text'
              value={this.state.dimensions}
              disabled={this.state.isLoading}
              onChange={ event => this.setState({ dimensions: event.target.value })}
              className='margin-bottom-tiny'
            />

            <button type='button' className='button' onClick={this.addItem}>Agregar</button>
          </div>
        </div>
      </section>
    );
  }
}

export default ArtistaPortfolio;
