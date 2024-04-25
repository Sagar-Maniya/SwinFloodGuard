// Header.js
import React from 'react';
import './Header.css'; // Assume you have a corresponding CSS file for styling

function Header() {
  return (
    <header className='site-header'>
      <nav>
        {/* Navigation items go here */}
        <div className='logo'>SWINFLOODGUARD</div>
        <ul>
          <li>Content</li>
          <li>News</li>
          <li>Feedback</li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
