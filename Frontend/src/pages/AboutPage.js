import React from 'react';
import './AboutPage.css'; // Import the CSS file for styling

function AboutPage() {
  return (
    <div className='App'>
      <div className='content-container'>
        <div className='main-content about-content'>
          <p>
            The project, "Smart Digital System for Flood Risk Management," based in Chennai and spearheaded by the
            Digital Construction Lab at Swinburne University, aims to develop an innovative solution leveraging smart
            data analytics and AI to effectively manage flood risks, addressing the pressing need for improved flood
            management strategies in vulnerable regions like Chennai.
          </p>
        </div>
      </div>
      <footer className='footer'>
      <p>© COPYRIGHT SWINFLOODGUARD</p>
      </footer>
    </div>
  );
}

export default AboutPage;
