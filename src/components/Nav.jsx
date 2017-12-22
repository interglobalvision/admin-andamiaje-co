import React from 'react';
import { Link } from 'react-router-dom';

const Nav = (props) => {
  return (
    <nav>
      <Link to="/posts">Posts</Link>
      <Link to="/catalogs">Catalogs</Link>
      <Link to="/logout">Salir</Link>
    </nav>
  );
};

export default Nav;
