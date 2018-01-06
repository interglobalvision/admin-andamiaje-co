import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';

@withRouter
@firebaseConnect()
class Nav extends Component {
  logOut() {
    this.props.firebase.logout();
    this.props.history.push('/');
  }

  render() {
    return (
      <nav className='padding-top-tiny padding-bottom-tiny'>
        <div className='container'>
          <div className='grid-row'>
            <div className='grid-item item-s-3'>
              <h1>Andamiaje</h1>
            </div>
            <div className='grid-item flex-grow grid-row align-items-center justify-end'>
              <div className='grid-item'>
                <Link to='/noticias'>Noticias</Link>
              </div>
              <div className='grid-item'>
                <Link to='/catalogs'>Catalogs</Link>
              </div>
              <div className='grid-item'>
                <button onClick={this.logOut.bind(this)}>Salir</button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
};

export default Nav;
