import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect } from 'react-redux-firebase';
import { withRouter } from 'react-router-dom';
import { toastr } from 'react-redux-toastr';

import axios from 'axios';

import randomString from 'random-string';

import { CloudFunctionsUrl } from '../../utilities/constants.js';

import { ToastrOptionsError, ToastrOptionsSuccess } from '../../utilities/toastr.js';

import { setIsLoading, setIsLoaded } from '../../redux/actions/loadingStatusActions'

import ImageUploads from '../fields/ImageUploads';

import UsuarioWishlist from './UsuarioWishlist';

const mapDispatchToProps = dispatch =>  ({
  setIsLoaded: () => dispatch(setIsLoaded()),
  setIsLoading: () => dispatch(setIsLoading()),
});

@firebaseConnect()
@withRouter
@connect(null, mapDispatchToProps)
class UsuarioForm extends Component {

  state = {
    active: false,
    role: '',
    name: '',
    email: '',
    displayName: '',
    images: [],
    password: '',
    tokens: 0,
    editarTokens: false,
    wishlist: {},
    error: {
      message: '',
    },
    isLoading: false,
  }

  // Uploads
  storagePath = 'uploads'; // path in the storage
  path = 'uploads'; // path in the db
  multipleUploads = false;

  constructor(props) {
    super(props);

    // If component recieves usuario as prop we merge it with initial state (used for editing)
    this.state = { ...this.state, ...props.usuario };

    // Binds
    this.handleUploadsChange = this.handleUploadsChange.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
  }

  deleteImage(image) {

    // Set Loading
    this.setState({ isLoading: true })

    // deleteFile(storagePath, dbPath)
    this.props.firebase.deleteFile(image.fullPath, `${this.path}/${image.key}`)
      .then(deletedImage => {

        // Filter out the deleted image from the current state
        const images = this.state.images.filter( image => {
          return image.fullPath !== deletedImage.path;
        });

        // Save the new state
        this.setState({ images });

        // If updating a Noticia, update only `images` in the db entry
        if (this.props.id) {
          return this.props.firebase
            .update(`noticias/${this.props.id}`, {
              images,
            })
        }
      })
      .catch( error => {
        console.log(error);
      })
      .then( () => {
        // Unset Loading
        this.setState({ isLoading: false })
      });
  }

  addUsuario() {
    const { active, role, name, email, displayName, images } = this.state;
    let { password, tokens } = this.state;

    // Create context references for callback
    const _this = this;
    const { firebase } = this.props;

    // Generate random password if empty
    if (password === '' || password === undefined) {
      password = randomString({length: 10});
    }

    if (role !== 'member') {
      tokens = 0;
    }

    // Create user function url
    const createUserFunction = CloudFunctionsUrl + '/createUser';

    // Loading. disables inputs
    this.setState({ isLoading: true });
    this.props.setIsLoading();

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
          images,
          password,
          tokens
        })

      )).then(() => {

        // Unset loading
        _this.setState({ isLoading: false });
        this.props.setIsLoaded();

        // Display success toast
        toastr.success('Éxito', 'Usuario creado', ToastrOptionsSuccess);

        // Redirect to /usuarios
        this.props.history.push('/usuarios');

      }).catch(error => {

        // Unset loading
        _this.setState({ isLoading: false });
        this.props.setIsLoaded();

        // Error handling
        if (error.response) {
          // Display error toast
          toastr.error('Error', error.response.data.message, ToastrOptionsError);

          console.log(error.response.data);
        }

      });
  }

  updateUsuario() {
    const { active, role, name, email, displayName, images } = this.state;
    let { password, tokens } = this.state;

    // Create context references for callback
    const _this = this;
    const { firebase } = this.props;
    const uid = this.props.id;

    // Generate random password if empty
    if (password === '' || password === undefined) {
      password = randomString({length: 10});
    }

    if (role !== 'member') {
      tokens = 0;
      this.setState({ tokens: 0 })
    }

    this.setState({ editarTokens: false })

    // Create user function url
    const updateUserFunction = CloudFunctionsUrl + '/updateUser';

    // Set loading
    this.setState({ isLoading: true })
    this.props.setIsLoading();

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
          images,
          password,
          tokens
        })

      )).then(() => {

        // Unset loading
        _this.setState({ isLoading: false });
        this.props.setIsLoaded();

        // Display success toast
        toastr.success('Éxito', 'Usuario actualizado', ToastrOptionsSuccess);

      }).catch((error) => {

        // Unset loading
        _this.setState({ isLoading: false });
        this.props.setIsLoaded();

        if (error.response) {
          // Error updating user profile
          console.log(error.response.data);

          // Display error toast
          toastr.error('Error', error.response.data.message, ToastrOptionsError);
        }

      });
  }


  handleUploadsChange(images) {
    this.setState({images});
  }

  render() {
    return (
      <form onSubmit={event => event.preventDefault()}>
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
            <div className='grid-row align-items-center margin-bottom-micro'>
              <input
                id='observer'
                name='role'
                type='radio'
                disabled={this.state.isLoading}
                checked={this.state.role === 'observer'}
                onChange={ event => this.setState({ role: event.target.id }) }
              />
              <label htmlFor='observer' className='font-size-small'>Observador</label>
            </div>
          </div>
          <div className='grid-item'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='name'>Tokens</label></h4>
            <input
              id='tokens'
              name='tokens'
              type='number'
              min='0'
              step='.5'
              max='15'
              disabled={this.state.isLoading || this.state.role !== 'member' || !this.state.editarTokens }
              value={this.state.tokens}
              onChange={ event => this.setState({ tokens: event.target.value })}
            />
          </div>
          <div className='grid-item'>
            <h4 className='font-size-small font-bold margin-bottom-tiny'><label htmlFor='name'>Editar Tokens</label></h4>
            <input
              id='editarTokens'
              name='editarTokens'
              type='checkbox'
              disabled={this.state.isLoading || this.state.role !== 'member'}
              checked={this.state.editarTokens}
              onChange={ event => this.setState({ editarTokens: event.target.checked })}
            />
          </div>
        </div>

        <div className='grid-row'>
          <div className='grid-item item-s-12 item-m-6 margin-bottom-basic'>
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

          <div className='grid-item item-s-12 item-m-6 margin-bottom-basic'>
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

          <div className='grid-item item-s-12 item-m-6 margin-bottom-basic'>
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

          <div className='grid-item item-s-12 item-m-6 margin-bottom-basic'>
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

        <ImageUploads
          title={'Foto de perfil'}
          images={this.state.images}
          updateImages={this.handleUploadsChange}
          storagePath={this.storagePath}
          path={this.path}
          disabled={this.state.isLoading}
          deleteFile={this.deleteImage}
          firebase={this.props.firebase}
          dropzone={{
            accept: 'image/jpeg, image/png',
            multiple: this.multipleUploads,
          }}
        />
        
        <UsuarioWishlist wishlist={this.state.wishlist} />

        <div className='grid-row margin-bottom-basic justify-end'>
          <div className='grid-item'>
            <button
              className='button' onClick={() => this.props.id ? this.updateUsuario() : this.addUsuario()}
              disabled={this.state.isLoading}
            >
              Guardar{ this.props.id ? '' : ' Nuevo'}
            </button>
          </div>
        </div>

      </form>
    );
  }
};

export default UsuarioForm;
