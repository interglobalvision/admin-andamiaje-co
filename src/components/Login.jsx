import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase';

import ReactSVG from 'react-svg';

class LoginForm extends Component {
  state = {
    email: '',
    username: '',
    password: '',
    error: {
      message: '',
    },
    isLoading: false,
  }

  componentDidMount() {
    this.email.focus()
  }

  login() {
    const { email, password } = this.state;

    this.setState({ isLoading: true });

    this.props.firebase
      .login({email, password})
      .then(() => {
        this.setState({ isLoading: false })
        // this is where we can redirect to another route
      })
      .catch((error) => {
        this.setState({ isLoading: false })
        this.setState({ error });
        console.log('there was an error', error)
      })

  }

  render() {
    return (
      <section className='container'>
        <div className='grid-row margin-top-basic margin-bottom-small'>
          <div className='grid-item item-s-12 margin-bottom-tiny'>
            <ReactSVG
              path='andamiaje-logo.svg'
              wrapperClassName='logo-wrapper'
              className='login-logo'
            />
          </div>
          <div className='grid-item item-s-12'>
            <h1>Iniciar Sesión</h1>
          </div>
        </div>
        <form onSubmit={event => event.preventDefault()}>
          <div className='grid-row'>
            <div className='grid-item item-s-12 item-m-6 margin-bottom-small'>
              <input
                ref={ ref => this.email = ref}
                type='text'
                placeholder='Email'
                onChange={event => this.setState({ email: event.target.value })}
              />
            </div>
            <div className='grid-item item-s-12 item-m-6 margin-bottom-small'>
              <input
                ref={ ref => this.password = ref}
                type='password'
                placeholder='Password'
                onChange={event => this.setState({ password: event.target.value })}
              />
            </div>
            <div className='grid-item item-s-12 item-m-6 margin-bottom-small'>
              <button
                className='button'
                onClick={() => this.login()}
                type='submit'>
                Iniciar Sesion
              </button>
              <div className='margin-top-small'>
                <p>{this.state.error.message}</p>
                <p>{this.state.loading}</p>
              </div>
            </div>
          </div>
        </form>
      </section>
    )
  }
}

export default firebaseConnect()(LoginForm);
