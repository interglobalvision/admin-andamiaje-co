import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseConnect, pathToJS } from 'react-redux-firebase';

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

    return this.props.firebase
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
      <form onSubmit={event => event.preventDefault()}>
        <input
          ref={ ref => this.email = ref}
          type='text'
          placeholder='Email'
          onChange={event => this.setState({ email: event.target.value })}
        />
        <input
          ref={ ref => this.password = ref}
          type='password'
          placeholder='Password'
          onChange={event => this.setState({ password: event.target.value })}
        />
        <button
          onClick={() => this.login()}
          type='submit'>
          Iniciar Sesion
        </button>
        <p>{this.state.error.message}</p>
        <p>{this.state.loading}</p>
      </form>
    )
  }
}

export default firebaseConnect()(LoginForm);
