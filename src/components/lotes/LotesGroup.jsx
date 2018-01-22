import React, { Component } from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';

class LotesGroup extends Component {

  state = {
    lotesGroup: [],
  }

  constructor(props) {
    super(props);

    // here load in existing data passed to component

    // Bind
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.addLoteToGroup = this.addLoteToGroup.bind(this);
  }

  addLoteToGroup(event) {
    const selectedLote = this.state.selectedLote;
    let lotesGroup = this.state.lotesGroup;

    // this needs to check if this already is in the group

    lotesGroup.push(selectedLote);

    this.setState({ lotesGroup });

    this.props.onChange({ lotesGroup });
  }

  handleSelectChange(event) {
    const id = event.target.options[event.target.selectedIndex].value;
    const title = event.target.options[event.target.selectedIndex].text;

    this.setState({ selectedLote: {
      id,
      title
    } });
  }

  render() {
    const { lotes } = this.props;

    if (!isLoaded(lotes)) { // If not loaded…
      return 'Loading'; // …show 'loading'
    } else if (isEmpty(lotes)) { // …else. If is empty…
      return (
        <select>
        </select>
      );
    } else {
      return (
        <div>
          <div>
            { this.state.lotesGroup.map(lote =>
              <h3 key={lote.id}>{lote.title}</h3>
            )}
          </div>
          <select onChange={this.handleSelectChange}>
            <option value=''></option>
            { lotes.map(lote =>
              <option key={lote.key} value={lote.key}>{lote.value.title}</option>
            )}
          </select>

          <button onClick={this.addLoteToGroup}>Add</button>
        </div>
      );
    }
  }
};

export default LotesGroup;
