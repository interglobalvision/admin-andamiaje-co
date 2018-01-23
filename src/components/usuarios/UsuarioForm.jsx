import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';

import axios from 'axios';

import randomString from 'random-string';

import CloudFunctionsUrl from '../../utilities/constants.js';

@firebaseConnect()
@withRouter
class UsuarioForm extends Component {

  state = {
    active: false,
    role: '',
    name: '',
    email: '',
    displayName: '',
    password: '',
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
    let { password } = this.state;

    // Create context references for callback
    const _this = this;
    const { firebase } = this.props;

    // Generate random password if empty
    if (password === '' || password === undefined) {
      password = randomString({length: 10});
    }

    // Create user function url
    const createUserFunction = CloudFunctionsUrl + '/createUser';

    // Loading. disables inputs
    this.setState({ isLoading: true });

    // Get current user auth token and make a req to create a new user
    firebase.auth().currentUser.getIdToken(true /* Force refresh */)
      .then(idToken => (

        // Call create user function
        axios.get(createUserFunction, {
          params: {
            email: email,
            password: password,
          },
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': idToken,
          },
          mode: 'no-cors'
        })

      )).then(response => (

        // Use set() to push to user profile with UID from user
        firebase.set('users/' + response.data.uid, {
          active,
          role,
          name,
          email,
          displayName,
          password
        })

      )).catch(error => {

        // Unset loading
        _this.setState({ isLoading: false });

        // Error handling
        if (error.response) {
          console.log(error.response.data);
        }

      }).then(() => {

        // Unset loading
        _this.setState({ isLoading: false });

        // Redirect to /usuarios
        this.props.history.push('/usuarios');

      });
  }

  updateUsuario() {
    const { active, role, name, email, displayName } = this.state;
    let { password } = this.state;

    // Create context references for callback
    const _this = this;
    const { firebase } = this.props;
    const uid = this.props.id;

    // Generate random password if empty
    if (password === '' || password === undefined) {
      password = randomString({length: 10});
    }

    // Create user function url
    const updateUserFunction = CloudFunctionsUrl + '/updateUser';

    // Set loading
    this.setState({ isLoading: true })

    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true)
      .then(idToken => (

        // Call update user function
        axios.get(updateUserFunction, {
          params: {
            email: email,
            password: password,
            uid: uid
          },
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Authorization': idToken,
          },
          mode: 'no-cors'
        })

      )).then((response) => (

        // Update user profile
        firebase.update(`users/${uid}`, {
          active,
          role,
          name,
          email,
          displayName,
          password
        })

      )).then(() => {

        // Unset loading
        _this.setState({ isLoading: false });

      }).catch((error) => {

        // Unset loading
        _this.setState({ isLoading: false });

        if (error.response) {
          // Error updating user profile
          console.log(error.response.data);
        }

      });
  }

  render() {
    return (
      <form onSubmit={event => event.preventDefault()}>
        <div className='grid-row margin-bottom-basic justify-end'>
          <div className='grid-item'>
            <button
              className='button' onClick={() => this.props.id ? this.updateUsuario() : this.addUsuario()}
              disabled={this.state.isLoading}
            >
              Guardar{ this.props.id ? '' : ' Nueva'}
            </button>
          </div>
        </div>

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'>Estado</h4>
            <div className='grid-row align-items-center margin-bottom-micro'>
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
            <div className='grid-row align-items-center margin-bottom-micro'>
              <input
                id='admin'
                name='role'
                type='radio'
                disabled={this.state.isLoading}
                checked={this.state.role === 'admin'}
                onChange={ event => this.setState({ role: event.target.id }) }
              />
              <label htmlFor='admin' className='font-size-small'>Admin</label>
            </div>
            <div className='grid-row align-items-center margin-bottom-micro'>
              <input
                id='artist'
                name='role'
                type='radio'
                disabled={this.state.isLoading}
                checked={this.state.role === 'artist'}
                onChange={ event => this.setState({ role: event.target.id }) }
              />
              <label htmlFor='artist' className='font-size-small'>Artista</label>
            </div>
            <div className='grid-row align-items-center margin-bottom-micro'>
              <input
                id='member'
                name='role'
                type='radio'
                disabled={this.state.isLoading}
                checked={this.state.role === 'member'}
                onChange={ event => this.setState({ role: event.target.id }) }
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
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='email'>Correo electrónico</label></h4>
            <input
              id='email'
              name='email'
              type='email'
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

        <div className='grid-row margin-bottom-basic'>
          <div className='grid-item item-s-12'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='password'>Contraseña</label></h4>
            <input
              id='password'
              name='password'
              type='text'
              disabled={this.state.isLoading}
              value={this.state.password}
              onChange={ event => this.setState({ password: event.target.value })}
            />
          </div>
        </div>

      </form>
    );
  }
};

export default UsuarioForm;
