import React from 'react';
import '../style/navbar.css';
import logo from '../assets/spiderweb_logo.png';


const Navbar = () => {
  return (
    <nav className="navbar">
        <div className="title-logo">
        <img className="header-logo"src={logo}></img>
        <div className="navbar-title">Spiderweb</div>
        </div>
      <div className="navbar-buttons">
        <button className="navbar-button">Reset</button>
        <button className="navbar-button">Filter</button>
        <button className="navbar-button">Group</button>
        <button className="navbar-button">
          Upload
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
