import React, { Component } from 'react';
import { toastr } from 'react-redux-toastr';

import Uploads from '../fields/Uploads';
import { getResizedImageUrl } from '../../utilities/images.js';

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

  moveItem(element, delta) {
    const items = this.props.items;
    const index = items.indexOf(element);
    const newIndex = index + delta;

    // Check if lready at the top or bottom.
    if (newIndex < 0  || newIndex === items.length) {
      return items;
    }

    let indexes = [index, newIndex]; //Sort the indexes

    return items.map( (item, index) => {
      if(index === indexes[0]) {
        return items[indexes[1]];
      } else if(index === indexes[1]) {
        return items[indexes[0]];
      } else {
        return item;
      }
    });
  }

  moveItemUp(item) {
    this.props.handlePortfolioChange(this.moveItem(item, -1));
  }

  moveItemDown(item) {
    this.props.handlePortfolioChange(this.moveItem(item, 1));
  }

  removeItem(key) {
    const { items } = this.props;

    // this doesnt delete the upload maybe doesnt matter
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

        <div className='artista-portfilio-items'>
          {this.props.items.map( (item, index) => {
            const { title, images, year, dimensions } = item;

            let imageUrl = undefined;

            if(images !== undefined) {
              imageUrl = getResizedImageUrl(images[0], '750', false);
            }

            return (
              <article key={index} className='grid-row padding-top-micro padding-bottom-small'>
                <div className='grid-item item-s-2 item-m-4'>
                  { imageUrl !== undefined ? <img src={imageUrl} /> : '' }
                </div>
                <div className='grid-item item-s-8 item-m-6'>
                  <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor={index + '-title'}>Título</label></h4>
                  <input id={index + '-title'} key={index + '-title'} type='text' value={title} onChange={e => this.changeValue(index, 'title', e.target.value)} className='margin-bottom-tiny' />

                  <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor={index + '-year'}>Año</label></h4>
                  <input id={index + '-year'} key={index + '-year'} type='text' value={year} onChange={e => this.changeValue(index, 'year', e.target.value)} className='margin-bottom-tiny' />

                  <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor={index + '-dimensions'}>Dimensiones</label></h4>
                  <input id={index + '-dimensions'} key={index + '-dimensions'} type='text' value={dimensions} onChange={e => this.changeValue(index, 'dimensions', e.target.value)} className='margin-bottom-tiny' />

                </div>
                <div className='grid-item flex-grow grid-row no-gutter justify-end'>
                  <button type='button' onClick={() => this.moveItemUp(item)} disabled={index === 0 ? 'disabled' : ''} className='button button-small'>↑</button>
                  <button type='button' onClick={() => this.moveItemDown(item)} disabled={index === this.props.items.length - 1 ? 'disabled' : ''} className='button button-small'>↓</button>
                  <button type='button' className='button button-small button-delete' onClick={() => toastr.confirm('¿Seguro que deseas eliminar esta entrada del portafolio?', ToastrOptionsConfirm(this.removeItem, index))}>Eliminar</button>
                </div>
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
