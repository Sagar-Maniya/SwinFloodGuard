import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
import NewsPage from './components/NewsPage';
import Footer from './components/Footer';
import FAQPage from './pages/FAQPage';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import FloodPredictionPage from './pages/FloodPredictionPage';
import EvacuationPointsPage from './pages/EvacuationPointsPage';
import AdminDasborad from './Admin/AdminDasborad';
const articlesData = [
  {
    title:
      'Rising Seas Will Tighten Vise on Miami Even for People Who Are Not Flood',
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
    <Router>
      <div className='App'>
        {/* <Header /> */}
        <div className='main-content'>
          <Routes>
            {' '}
            <Route
              path='/news'
              element={
                <section className='news-section'>
                  <NewsPage articles={articlesData} />
                </section>
              }
            />
            <Route
              path='/flood-predictions'
              element={<FloodPredictionPage />}
            />
            <Route
              path='/evacuation-points'
              element={<EvacuationPointsPage />}
            />
            <Route path='/AdminDasborad' element={<AdminDasborad />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/' element={<HomePage />} />
            <Route path='/faq' element={<FAQPage />} />
            <Route
              path='/flood-predictions'
              element={<FloodPredictionPage />}
            />
            {/* <Route path='/user' element={<User />} /> */}
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
