import React from 'react';
import '../style/navbar.css';
import logo from '../assets/spiderweb_logo.png';


const Navbar = ({ onUploadClick, onResetClick }) => {
  return (
    <nav className="navbar">
      <div className="title-logo">
        <img className="header-logo" src={logo} alt="Logo" />
        <div className="navbar-title">Spiderweb</div>
      </div>
      <div className="navbar-buttons">
        <button className="navbar-button" onClick={onResetClick}>Reset</button>
        <button className="navbar-button">Filter</button>
        <button className="navbar-button">Group</button>
        <button className="navbar-button" onClick={onUploadClick}>Upload</button>
      </div>
    </nav>
  );
}

export default Navbar;
