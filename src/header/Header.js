import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

export default function Header(props) {
  return (
    <div>
      <nav className="site-header sticky-top py-1">
        <div className="container d-flex flex-column flex-md-row justify-content-between">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
        </div>
      </nav>
    </div>
  );
}
