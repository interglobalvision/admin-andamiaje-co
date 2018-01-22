import React, { Component } from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';

class ObrasGroup extends Component {

  state = {
    obrasGroup: [],
  }

  constructor(props) {
    super(props);

    // here load in existing data passed to component

    // Bind
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.addObraToGroup = this.addObraToGroup.bind(this);
  }

  addObraToGroup(event) {
    const selectedObra = this.state.selectedObra;
    let obrasGroup = this.state.obrasGroup;

    // this needs to check if this already is in the group

    obrasGroup.push(selectedObra);

    this.setState({ obrasGroup });

    this.props.onChange({ obrasGroup });
  }

  handleSelectChange(event) {
    const id = event.target.options[event.target.selectedIndex].value;
    const title = event.target.options[event.target.selectedIndex].text;

    this.setState({ selectedObra: {
      id,
      title
    } });
  }

  render() {
    const { obras } = this.props;

    if (!isLoaded(obras)) { // If not loaded…
      return 'Loading'; // …show 'loading'
    } else if (isEmpty(obras)) { // …else. If is empty…
      return (
        <select>
        </select>
      );
    } else {
      return (
        <div>
          <div>
            { this.state.obrasGroup.map(obra =>
              <h3 key={obra.id}>{obra.title}</h3>
            )}
          </div>
          <select onChange={this.handleSelectChange}>
            <option value=''></option>
            { obras.map(obra =>
              <option key={obra.key} value={obra.key}>{obra.value.title}</option>
            )}
          </select>

          <button className='button' onClick={this.addObraToGroup}>Add</button>
        </div>
      );
    }
  }
};

export default ObrasGroup;
