import React, { Component } from 'react';
import { Link } from 'react-router-dom';


export default class Navbar extends Component {

  render() {
    return (
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg">
        <Link to="/homepage" className="navbar-brand">GUC Portal</Link>
        <div className="collpase navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="navbar-item">
          <Link to="/" className="nav-link">log out </Link>
          </li>
          <li className="navbar-item">
          <Link to="/create" className="nav-link">attendance</Link>
          </li>
          <li className="navbar-item">
          <Link to="/notification" className="nav-link">notifications </Link>
          </li>
          <li className="navbar-item">
          <Link to="/user" className="nav-link">View profile </Link>
          </li>
        </ul>
       
        
        </div>
      </nav>
    );
  }
}