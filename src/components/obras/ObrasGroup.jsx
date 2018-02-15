import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import { isLoaded, isEmpty } from 'react-redux-firebase';

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
  }

  addObraToGroup() {
    const selectedObra = this.state.selectedObra;

    this.props.addObraToGroup(selectedObra);

    this.setState({
      selectedObra: {}
    });
  }

  removeObraFromGroup(id) {
    this.props.removeObraFromGroup(id);
  }

  handleSelectChange(event) {
    if (event.target.options[event.target.selectedIndex].value === '') {
      this.setState({
        selectedObra: {},
      });

      return;
    }

    const id = event.target.options[event.target.selectedIndex].value;

    const { value: { artista, title, year, materials, tecnica } } = this.props.allObras.find( obra => obra.key === id );

    this.setState({
      selectedObra: {
        id,
        artista,
        title,
        year,
        materials,
        tecnica,
      },
    });
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
    const { allObras, selectedObras, removeObraFromGroup } = this.props;
    const filteredObras = this.filterObras(allObras, selectedObras);

    if (!isLoaded(allObras)) { // If not loaded…
      return 'Loading'; // …show 'loading'
    } else {
      return (
        <div>
          <div className='grid-row'>
            { selectedObras.map(obra =>
              <ObrasGroupItem key={obra.id} obra={obra} removeObraFromGroup={removeObraFromGroup} />
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
  addObraToGroup: PropTypes.func.isRequired,
  allObras: PropTypes.array,
  removeObraFromGroup: PropTypes.func.isRequired,
  selectedObras: PropTypes.array,
};

export default ObrasGroup;
