import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // Ensure this path matches your CSS file's location

function HomePage() {
  return (
    <div className='home-page'>
      <h1>Welcome to SwinFloodGuard</h1>
      <p>
        SwinFloodGuard is an innovative platform designed to manage flood risks
        using smart data analytics and artificial intelligence. Our mission is
        to enhance flood preparedness and response in critical regions.
      </p>
      <div className='links'>
        <Link to='/about'>Learn More About Us</Link>
        <Link to='/services'>Our Services</Link>
        <Link to='/contact'>Get In Touch</Link>
      </div>
    </div>
  );
}

export default HomePage;
