import React, { Component } from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';

class ArtistaSelect extends Component {
  constructor(props) {
    super(props);

    // Bind
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    const artista = event.target.value;
    var artistaName = event.target.options[event.target.selectedIndex].text;

    this.props.onChange({ artista, artistaName});
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
        <select onChange={this.handleChange}>
          <option value=''></option>
          { artistas.map(artista => (
            <option key={artista.key} value={artista.key}>{artista.value.name}</option>
          ))}
        </select>
      );
    }
  }
};

export default ArtistaSelect;
