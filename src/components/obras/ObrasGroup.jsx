import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import { isLoaded, isEmpty } from 'react-redux-firebase';
import { omitBy, isNil } from 'lodash';

import ObrasGroupItem from '../../components/obras/ObrasGroupItem';

class ObrasGroup extends Component {

  state = {
    selectedObra: {},
  }

  constructor(props) {
    super(props);

    // here load in existing data passed to component

    // Bind
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.addObraToGroup = this.addObraToGroup.bind(this);
    this.moveObraUp = this.moveObraUp.bind(this);
    this.moveObraDown = this.moveObraDown.bind(this);
    this.removeObraFromGroup = this.removeObraFromGroup.bind(this);
  }

  addObraToGroup() {
    const selectedObra = this.state.selectedObra;

    this.props.onChange([...this.props.selectedObras, selectedObra]);

    this.setState({
      selectedObra: {}
    });
  }

  moveObra(element, delta) {
    const obras = this.props.selectedObras;
    const index = obras.indexOf(element);
    const newIndex = index + delta;

    // Check if lready at the top or bottom.
    if (newIndex < 0  || newIndex === obras.length) {
      return obras;
    }

    let indexes = [index, newIndex]; //Sort the indexes

    return obras.map( (item,index) => {
      if(index === indexes[0]) {
        return obras[indexes[1]];
      } else if(index === indexes[1]) {
        return obras[indexes[0]];
      } else {
        return item;
      }
    });

  }

  moveObraUp(obra) {
    this.props.onChange(this.moveObra(obra, -1));
  }

  moveObraDown(obra) {
    this.props.onChange(this.moveObra(obra, 1));
  }

  removeObraFromGroup(id) {
    this.props.onChange(this.props.selectedObras.filter( obra => obra.id !== id ));
  }

  handleSelectChange(event) {
    if (event.target.options[event.target.selectedIndex].value === '') {
      this.setState({
        selectedObra: {},
      });

      return;
    }

    const id = event.target.options[event.target.selectedIndex].value;

    const { value: { artista, medium, title, year, materials, tecnica, images } } = this.props.allObras.find( obra => obra.key === id );

    // Clean selectedObra from undefined values
    const selectedObra = omitBy({
      id,
      artista,
      title,
      year,
      materials,
      tecnica,
      images
    }, isNil);

    this.setState({selectedObra});
  }

  // Filter out addedObras from availableObras comparing
  // their key and id
  filterObras(allObras = [], selectedObras = []) {
    return allObras.filter(obra => {
      // Find if the obra is in addedObras
      return selectedObras.find( selectedObra => selectedObra.id === obra.key) === undefined ? true : false;
    });
  }

  render() {
    const { allObras, selectedObras } = this.props;
    const filteredObras = this.filterObras(allObras, selectedObras);

    if (!isLoaded(allObras)) { // If not loaded…
      return 'Loading'; // …show 'loading'
    } else {
      return (
        <div>
          <div className='grid-row'>
            { selectedObras.map( (obra, index) =>
              <ObrasGroupItem key={obra.id} obra={obra} moveObraUp={this.moveObraUp} moveObraDown={this.moveObraDown} removeObraFromGroup={this.removeObraFromGroup} upDisabled={index === 0 ? 'disabled' : ''} downDisabled={index === selectedObras.length - 1 ? 'disabled' : ''} />
            )}
          </div>
          { isEmpty(filteredObras) ? '' :
            <div className='grid-row padding-bottom-basic align-items-center flex-nowrap'>
              <div className='grid-item flex-grow'>
                <div className='select-wrapper'>
                  <select onChange={this.handleSelectChange}>
                    <option value=''></option>
                    { filteredObras.map(obra =>
                      <option key={obra.key} value={obra.key}>{obra.value.title}</option>
                    ) }
                  </select>
                </div>
              </div>
              <div className='grid-item'>
                <button className='button' type='button' disabled={!Object.keys(this.state.selectedObra).length ? 'disabled' : ''} onClick={this.addObraToGroup}>Agregar</button>
              </div>
            </div>
          }
        </div>
      );
    }
  }
};

ObrasGroup.propTypes = {
  allObras: PropTypes.array,
  selectedObras: PropTypes.array,
  onChange: PropTypes.func.isRequired,
};

export default ObrasGroup;
