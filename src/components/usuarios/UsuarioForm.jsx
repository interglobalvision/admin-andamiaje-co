import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';

@firebaseConnect()
@withRouter
class UsuarioForm extends Component {

  state = {
    active: false,
    name: '',
    displayName: '',
    error: {
      message: '',
    },
    isLoading: false,
  }

  constructor(props) {
    super(props);

    // If component recieves usuario as prop we merge it with initial state (used for editing)
    this.state = { ...this.state, ...props.usuario };
  }

  addUsuario() {
    const { active, role, name, email, displayName } = this.state;

    const createdDate = Date.now();

    this.setState({ isLoading: true })

    this.props.firebase
      .push('usuarios', {
        active,
        role,
        name,
        email,
        displayName,
        createdDate
      })
      .then(() => {
        this.setState({ isLoading: false })
        this.props.history.push('/usuarios');
      })

  }

  updateUsuario() {
    const { active, role, name, email, displayName } = this.state;

    this.setState({ isLoading: true })

    this.props.firebase
      .update(`usuarios/${this.props.id}`, {
        active,
        role,
        name,
        email,
        displayName
      })
      .then(() => {
        this.setState({ isLoading: false })
      })

  }

  onChangeRole(event) {
    this.setState({ role: event.target.id })
  }

  render() {
    return (
      <form onSubmit={event => event.preventDefault()}>
        <div className='grid-row margin-bottom-basic justify-end'>
          <div className='grid-item'>
            <button className='button' onClick={() => this.props.id ? this.updateUsuario() : this.addUsuario()}>
              Guardar{ this.props.id ? '' : ' Nueva'}
            </button>
          </div>
        </div>

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'>Estado</h4>
            <div className='grid-row align-items-center'>
              <input
                id='active'
                name='active'
                type='checkbox'
                disabled={this.state.isLoading}
                checked={this.state.active}
                onChange={ event => this.setState({ active: event.target.checked })}
              />
              <label htmlFor='active' className='font-size-small'>Activo</label>
            </div>
          </div>

          <div className='grid-item'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'>Tipo de usuario</h4>
            <div className='grid-row align-items-center'>
              <input
                id='admin'
                name='role'
                type='radio'
                disabled={this.state.isLoading}
                checked={this.state.role === 'admin'}
                onChange={ this.onChangeRole.bind(this) }
              />
              <label htmlFor='admin' className='font-size-small'>Admin</label>
            </div>
            <div className='grid-row align-items-center'>
              <input
                id='artist'
                name='role'
                type='radio'
                disabled={this.state.isLoading}
                checked={this.state.role === 'artist'}
                onChange={ this.onChangeRole.bind(this) }
              />
              <label htmlFor='artist' className='font-size-small'>Artista</label>
            </div>
            <div className='grid-row align-items-center'>
              <input
                id='member'
                name='role'
                type='radio'
                disabled={this.state.isLoading}
                checked={this.state.role === 'member'}
                onChange={ this.onChangeRole.bind(this) }
              />
              <label htmlFor='member' className='font-size-small'>Miembro</label>
            </div>
          </div>
        </div>

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-12'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='name'>Nombre completo</label></h4>
            <input
              id='name'
              name='name'
              type='text'
              disabled={this.state.isLoading}
              value={this.state.name}
              onChange={ event => this.setState({ name: event.target.value })}
            />
          </div>
        </div>

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-12'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='email'>Correo electronico</label></h4>
            <input
              id='email'
              name='email'
              type='text'
              disabled={this.state.isLoading}
              value={this.state.email}
              onChange={ event => this.setState({ email: event.target.value })}
            />
          </div>
        </div>

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-12'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='displayName'>Nombre para mostrar</label></h4>
            <input
              id='displayName'
              name='displayName'
              type='text'
              disabled={this.state.isLoading}
              value={this.state.displayName}
              onChange={ event => this.setState({ displayName: event.target.value })}
            />
          </div>
        </div>

      </form>
    );
  }
};

export default UsuarioForm;
