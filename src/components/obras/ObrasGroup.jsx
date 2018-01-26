import React, { Component } from 'react';
import { isLoaded, isEmpty } from 'react-redux-firebase';

import ObrasGroupItem from '../../components/obras/ObrasGroupItem';

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

    this.props.onChange(selectedObra);
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

  render() {
    const { obras, selectedObras } = this.props;

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
          <div className='grid-row padding-top-micro padding-bottom-basic align-items-center'>
            { selectedObras.map(obra =>
              <ObrasGroupItem key={obra.id} obra={obra} />
            )}
          </div>
          <select onChange={this.handleSelectChange}>
            <option value=''></option>
            { obras.filter(obra => {
              for (let i = 0; i < selectedObras.length; i++) {
                if (obra.key === selectedObras[i].id) {
                  return false;
                }
              }
              return true;
            }).map(obra =>
              <option key={obra.key} value={obra.key}>{obra.value.title}</option>
            ) }
          </select>

          <button className='button' onClick={this.addObraToGroup}>Add</button>
        </div>
      );
    }
  }
};

export default ObrasGroup;