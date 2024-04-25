// NewsArticle.js
import React from 'react';
import './NewsArticle.css'; // Assume you have a corresponding CSS file for styling

function NewsArticle({ title, children }) {
  return (
    <article className='news-article'>
      <h2>{title}</h2>
      {children}
      {/* You can pass additional content as children */}
    </article>
  );
}

export default NewsArticle;
