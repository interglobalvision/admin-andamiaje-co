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
    this.moveLoteUp = this.moveLoteUp.bind(this);
    this.moveLoteDown = this.moveLoteDown.bind(this);
    this.removeLoteFromGroup = this.removeLoteFromGroup.bind(this);

  }

  addLoteToGroup() {
    const selectedLote = this.state.selectedLote;

    const newLote = {
      id: selectedLote.id,
      artista: {
        id: selectedLote.artista.id,
        name: selectedLote.artista.name,
      },
      title: selectedLote.title,
    };

    this.props.onChange([...this.props.selectedLotes, newLote]);

    this.setState({
      selectedLote: {}
    });
  }

  removeLoteFromGroup(id) {
    this.props.onChange(this.props.selectedLotes.filter( lote => lote.id !== id ));
  }

  moveLote(element, delta) {
    const lotes = this.props.selectedLotes;
    const index = lotes.indexOf(element);
    const newIndex = index + delta;

    // Check if lready at the top or bottom.
    if (newIndex < 0  || newIndex === lotes.length) {
      return lotes;
    }

    let indexes = [index, newIndex]; //Sort the indexes

    return lotes.map( (item,index) => {
      if(index === indexes[0]) {
        return lotes[indexes[1]];
      } else if(index === indexes[1]) {
        return lotes[indexes[0]];
      } else {
        return item;
      }
    });

  }

  moveLoteUp(lote) {
    this.props.onChange(this.moveLote(lote, -1));
  }

  moveLoteDown(lote) {
    this.props.onChange(this.moveLote(lote, 1));
  }

  handleSelectChange(event) {
    if (event.target.options[event.target.selectedIndex].value === '') {
      this.setState({
        selectedLote: {},
      });

      return;
    }

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
    const { allLotes, selectedLotes } = this.props;
    const availableLotes = this.filterLotes(allLotes, selectedLotes);

    console.log(this.state.selectedLote);

    if (!isLoaded(allLotes)) { // If not loaded…
      return 'Loading'; // …show 'loading'
    } else {
      return (
        <div>
          <header className='grid-row margin-bottom-tiny font-size-small font-bold'>
            <div className='grid-item item-s-3 item-m-5'>
              <h3>Título</h3>
            </div>
            <div className='grid-item item-s-3'>
              <h3>Artista</h3>
            </div>
          </header>

          <div className='list-rows-holder padding-bottom-small'>
            { selectedLotes.map( (lote, index) =>
              <LotesGroupItem key={lote.id} lote={lote} moveLoteUp={this.moveLoteUp} moveLoteDown={this.moveLoteDown} removeLoteFromGroup={this.removeLoteFromGroup} upDisabled={index === 0 ? 'disabled' : ''} downDisabled={index === selectedLotes.length - 1 ? 'disabled' : ''} />
            )}
          </div>
          { isEmpty(availableLotes) ? '' :
            <div className='grid-row align-items-center flex-nowrap'>
              <div className='grid-item flex-grow'>
                <div className='select-wrapper'>
                  <select onChange={this.handleSelectChange}>
                    <option value=''></option>
                    { availableLotes.map(lote =>
                      <option key={lote.key} value={lote.key}>{lote.value.artista.name} - {lote.value.title}</option>
                    ) }
                  </select>
                </div>
              </div>
              <div className='grid-item'>
                <button type='button' className='button' disabled={!Object.keys(this.state.selectedLote).length ? 'disabled' : ''} onClick={this.addLoteToGroup}>Agregar</button>
              </div>
            </div>
          }
        </div>
      );
    }
  }
};

LotesGroup.propTypes = {
  onChange: PropTypes.func.isRequired,
  allLotes: PropTypes.array,
  selectedLotes: PropTypes.array,
};

export default LotesGroup;
