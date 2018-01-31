import React, { Component } from 'react';
import PropTypes from 'prop-types'; // ES6
import { isLoaded, isEmpty } from 'react-redux-firebase';

import LotesGroupItem from '../../components/lotes/LotesGroupItem';

class LotesGroup extends Component {

  state = {
    selectedLote: {},
  }

  constructor(props) {
    super(props);

    // here load in existing data passed to component

    // Bind
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.addLoteToGroup = this.addLoteToGroup.bind(this);
  }

  addLoteToGroup() {
    const selectedLote = this.state.selectedLote;

    this.props.addLoteToGroup(selectedLote);
  }

  removeLoteFromGroup(id) {
    this.props.removeLoteFromGroup(id);
  }

  handleSelectChange(event) {
    const id = event.target.options[event.target.selectedIndex].value;

    const { value: { artista, title } } = this.props.allLotes.find( lote => lote.key === id );

    this.setState({
      selectedLote: {
        id,
        artista: {
          id: artista.id,
          name: artista.name,
        },
        title,
      },
    });
  }

  // Filter out addedLotes from availableLotes comparing
  // their key and id
  filterLotes(allLotes = [], selectedLotes = []) {
    return allLotes.filter(lote => {
      // Find if the lote is in addedLotes
      return selectedLotes.find( selectedLote => selectedLote.id === lote.key) === undefined ? true : false;
    });
  }

  render() {
    const { allLotes, selectedLotes, removeLoteFromGroup } = this.props;
    const filteredLotes = this.filterLotes(allLotes, selectedLotes);

    if (!isLoaded(allLotes)) { // If not loaded…
      return 'Loading'; // …show 'loading'
    } else {
      return (
        <div>
          <div className='grid-row padding-top-micro padding-bottom-basic align-items-center'>
            { selectedLotes.map(lote =>
              <LotesGroupItem key={lote.id} lote={lote} removeLoteFromGroup={removeLoteFromGroup} />
            )}
          </div>
          { isEmpty(filteredLotes) ? '' :
            <div className='grid-row padding-bottom-basic'>
              <select onChange={this.handleSelectChange} className='grid-item item-s-12 item-m-4'>
                <option value=''></option>
                { filteredLotes.map(lote =>
                  <option key={lote.key} value={lote.key}>{lote.value.artista.name} - {lote.value.title}</option>
                ) }
              </select>

              <button className='button grid-item item-s-12 item-m-2' onClick={this.addLoteToGroup}>Agregar</button>
            </div>
          }
        </div>
      );
    }
  }
};

LotesGroup.propTypes = {
  addLoteToGroup: PropTypes.func.isRequired,
  allLotes: PropTypes.array,
  removeLoteFromGroup: PropTypes.func.isRequired,
  selectedLotes: PropTypes.array,
};

export default LotesGroup;
