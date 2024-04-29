// Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './Header.css'; // Assume you have a corresponding CSS file for styling

function Header() {
  return (
    <header className='site-header'>
      <nav>
        {/* Navigation items go here */}
        <div className='logo'>SWINFLOODGUARD</div>
        <ul>
          <li>
            <NavLink exact='true' to='/' activeclassname='active'>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to='/news' activeclassname='active'>
              News
            </NavLink>
          </li>
          <li>
            <NavLink to='/faq' activeclassname='active'>
              FAQ
            </NavLink>
          </li>
          <li>
            <NavLink to='/evacuation-points' activeclassname='active'>
              Evacuation Points
            </NavLink>
          </li>
          <li>
            <NavLink to='/login' activeclassname='active'>
              Login
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
