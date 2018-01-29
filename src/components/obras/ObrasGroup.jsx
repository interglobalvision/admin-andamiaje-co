import React, { Component } from 'react';
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
  }

  removeObraFromGroup(id) {
    this.props.removeObraFromGroup(id);
  }

  handleSelectChange(event) {
    const id = event.target.options[event.target.selectedIndex].value;
    const title = event.target.options[event.target.selectedIndex].text;

    this.setState({
      selectedObra: {
        id,
        title
      }
    });
  }

  // Filter out addedObras from availableObras comparing
  // their key and id
  filterObras(allObras = [], selectedObras = []) {
    console.log('SELECTED OBRAS', selectedObras);
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
          <div className='grid-row padding-top-micro padding-bottom-basic align-items-center'>
            { selectedObras.map(obra =>
              <ObrasGroupItem key={obra.id} obra={obra} removeObraFromGroup={removeObraFromGroup} />
            )}
          </div>
          { isEmpty(filteredObras) ? '' :
            <div className='grid-row padding-bottom-basic'>
              <select onChange={this.handleSelectChange} className='grid-item item-s-12 item-m-4'>
                <option value=''></option>
                { filteredObras.map(obra =>
                  <option key={obra.key} value={obra.key}>{obra.value.title}</option>
                ) }
              </select>

              <button className='button grid-item item-s-12 item-m-2' onClick={this.addObraToGroup}>Agregar</button>
            </div>
          }
        </div>
      );
    }
  }
};

export default ObrasGroup;
