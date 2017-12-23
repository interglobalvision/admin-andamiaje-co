import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';

class Nav extends Component {
  logOut() {
    this.props.firebase.logout();
    this.props.history.push('/');
  }

  render() {
    return (
      <nav>
        <Link to="/posts">Posts</Link>
        <Link to="/catalogs">Catalogs</Link>
        <button onClick={this.logOut.bind(this)}>Salir</button>
      </nav>
    );
  }
};

export default withRouter(firebaseConnect()(Nav));
