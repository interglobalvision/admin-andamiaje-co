import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { firebaseConnect } from 'react-redux-firebase';

import ReactSVG from 'react-svg';

@withRouter
@firebaseConnect()
class Nav extends Component {
  logOut() {
    this.props.firebase.logout();
    this.props.history.push('/');
  }

  render() {
    return (
      <header id='header' className='padding-top-small padding-bottom-small margin-bottom-basic font-color-white'>
        <div className='container'>
          <div className='grid-row'>
            <div className='grid-item item-s-3'>
              <h1 className='u-visuallyhidden'>Andamiaje</h1>
              <ReactSVG
                path='andamiaje-logo.svg'
                wrapperClassName='logo-wrapper'
                className='logo'
              />
            </div>
            <nav className='grid-item flex-grow grid-row align-items-center justify-end'>
              <div className='grid-item'>
                <Link to='/noticias'>Noticias</Link>
              </div>
              <div className='grid-item'>
                <Link to='/artistas'>Artistas</Link>
              </div>
              <div className='grid-item'>
                <Link to='/catalogs'>Catalogs</Link>
              </div>
              <div className='grid-item'>
                <Link to='/usuarios'>Usuarios</Link>
              </div>
              <div className='grid-item'>
                <button className='font-color-white' onClick={this.logOut.bind(this)}>Salir</button>
              </div>
            </nav>
          </div>
        </div>
      </header>
    );
  }
};

export default Nav;
