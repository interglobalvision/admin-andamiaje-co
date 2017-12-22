import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Control, Form, Errors, actions } from 'react-redux-form';

class LoginForm extends Component {
  userLogin(values) {
    const { email, password } = values;
  }

  handleSubmit(user) {
    this.userLogin(user);
  }
  render() {
    return (
      <Form
        model="forms.login"
        onSubmit={(user) => this.handleSubmit(user)}
      >
        <label htmlFor=".email">Email</label>
        <Control.text model=".email" id=".email" required />

        <label htmlFor=".password">Password</label>
        <Control.password model=".password" id=".password" required />

        <Errors className="errors" model="forms.login" />
        <button type="submit">Login</button>
      </Form>
    );
  }
}

export default connect(null)(LoginForm);
