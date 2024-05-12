// NewsPage.js
import React from 'react';
import './NewsPage.css'; // Make sure to create a corresponding CSS file
import Header from '../../src/components/Header';


const NewsPage = ({ articles }) => {
  // Render each main article and its subarticles
  const renderArticles = articles.map((article, index) => (
    <div key={index} className='article-container'>
      <div className='main-article'>
        <img
          src={article.imageUrl}
          alt={article.title}
          className='article-image'
        />
        <h2 className='article-title'>{article.title}</h2>
        <div className='sub-articles'>
          {article.subArticles.map((sub, idx) => (
            <div key={idx} className='sub-article'>
              <img
                src={sub.imageUrl}
                alt={sub.title}
                className='sub-article-image'
              />
              <h3 className='sub-article-title'>{sub.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  ));

  return <>
    <Header />

    <div className='news-page'>{renderArticles}</div>
  </>;
};

export default NewsPage;
