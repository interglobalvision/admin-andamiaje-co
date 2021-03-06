import React, { Component } from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';

class ArtistaSelect extends Component {
  constructor(props) {
    super(props);

    // Bind
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const id = selectedOption.value;
    const name = selectedOption.text;

    this.props.onChange({id, name});
  }

  render() {
    const { artistas } = this.props;

    if (!isLoaded(artistas)) { // If not loaded…
      return 'Loading'; // …show 'loading'
    } else if (isEmpty(artistas)) { // …else. If is empty…
      return (
        <select>
        </select>
      );
    } else {
      return (
        <div className='select-wrapper'>
          <select onChange={this.handleChange} value={this.props.value}>
            <option key='' value=''></option>
            { artistas.map(artista =>
              <option key={artista.key} value={artista.key}>{artista.value.name}</option>
            )}
          </select>
        </div>
      );
    }
  }
};

export default ArtistaSelect;
