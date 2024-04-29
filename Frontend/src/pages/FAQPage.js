import React from 'react';
import './FAQPage.css'; // Ensure this path matches your CSS file's location

function FAQPage() {
  return (
    <div className='faq-page'>
      <h1>Frequently Asked Questions</h1>
      <div className='faq-item'>
        <h2>What is the purpose of SwinFloodGuard?</h2>
        <p>
          SwinFloodGuard is a platform that provides real-time flood updates to
          help people in flood-prone areas make informed decisions.
        </p>
      </div>
      <div className='faq-item'>
        <h2>How can I contribute to SwinFloodGuard?</h2>
        <p>
          You can contribute by sharing flood updates, volunteering to help
          flood victims, or donating to flood relief organizations.
        </p>
      </div>
      <div className='faq-item'>
        <h2>How can I get involved in flood prevention efforts?</h2>
        <p>
          You can get involved by joining local flood prevention groups,
          participating in flood drills, or supporting flood prevention
          initiatives in your community.
        </p>
      </div>
      <div className='faq-item'>
        <h2>How can I stay safe during a flood?</h2>
        <p>
          You can stay safe during a flood by following evacuation orders,
          avoiding flooded areas, and seeking higher ground if necessary.
        </p>
      </div>
    </div>
  );
}

export default FAQPage;
