import React from 'react';
import './App.css';

// Import your components here
import Header from './components/Header';
import NewsArticle from './components/NewsArticle';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';

import NewsPage from './components/NewsPage';

const articlesData = [
  {
    title:
      'Rising Seas Will Tighten Vise on Miami Even for People Who Are Not Flooded',
    imageUrl:
      'https://images.pexels.com/photos/19749836/pexels-photo-19749836.jpeg', // Aerial view of flood
    subArticles: [
      {
        title:
          'New Super-Fast Flood Model Has Potentially Life-Saving Benefits',
        imageUrl:
          'https://images.pexels.com/photos/1739855/pexels-photo-1739855.jpeg', // Man pouring water from dipper
      },
      {
        title: 'Study Reveals Human Destruction of Global Floodplains',
        imageUrl:
          'https://images.pexels.com/photos/3122812/pexels-photo-3122812.jpeg', // Body of water surrounded with grass
      },
    ],
  },
  {
    title: 'One of my happiest moments: Family stranded on Nullarbor rescued',
    imageUrl:
      'https://images.pexels.com/photos/1739855/pexels-photo-1739855.jpeg', // Man pouring water from dipper
    subArticles: [
      {
        title: 'Woman dies after car submerged in floodwaters in Queensland',
        imageUrl:
          'https://images.pexels.com/photos/19749836/pexels-photo-19749836.jpeg', // Aerial view of flood
      },
      {
        title:
          'Life-threatening flooding warning as ex-tropical cyclone heads southeast',
        imageUrl:
          'https://images.pexels.com/photos/3122812/pexels-photo-3122812.jpeg', // Body of water surrounded with grass
      },
    ],
  },
  {
    title: 'Tradies save elderly man in car swept away by floodwaters',
    imageUrl:
      'https://images.pexels.com/photos/3122812/pexels-photo-3122812.jpeg', // Body of water surrounded with grass
    subArticles: [
      {
        title: 'Warning of more wild weather for south-east Queensland',
        imageUrl:
          'https://images.pexels.com/photos/19749836/pexels-photo-19749836.jpeg', // Aerial view of flood
      },
      {
        title: 'Army sent in to flood-hit region as millions in aid announced',
        imageUrl:
          'https://images.pexels.com/photos/1739855/pexels-photo-1739855.jpeg', // Man pouring water from dipper
      },
    ],
  },
];

function App() {
  return (
    <div className='App'>
      <Header />
      <div className='main-content'>
        <section className='news-section'>
          <NewsPage articles={articlesData} />
        </section>
      </div>
      <Footer />
    </div>
  );
}

export default App;