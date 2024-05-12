import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Header.css';

function PredectionHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const [firstName, setFirstName] = useState(localStorage.getItem('firstName'));
  const [userImage, setUserImage] = useState(
    'https://p7.hiclipart.com/preview/247/564/869/computer-icons-user-profile-clip-art-user-avatar.jpg'
  );

  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    const storedFirstName = localStorage.getItem('firstName');
    const storedUserImage = localStorage.getItem('userImage');

    if (storedFirstName) {
      setFirstName(storedFirstName);
    }

    if (storedUserImage) {
      setUserImage(storedUserImage);
    }

    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('firstName');
    localStorage.removeItem('userImage');
    localStorage.setItem('isLoggedIn', 'false');
    setIsLoggedIn(false);
    setFirstName(null);
    setUserImage(
      'https://p7.hiclipart.com/preview/247/564/869/computer-icons-user-profile-clip-art-user-avatar.jpg'
    );
    navigate('/'); // Redirect to the login page
  };

  return (
    <header className='site-header'>
      <nav className='header-nav'>
        <div className='logo'>SWINFLOODGUARD</div>
        <ul className='nav-links'>
          <li>
            <NavLink
              to={isLoggedIn ? '/flood-predictions' : '/login'}
              activeClassName='active'
            >
              Flood Predection
            </NavLink>
          </li>
          <li>
            {isLoggedIn ? (
              <div className='user-profile'>
                <img src={userImage} alt='User' className='user-avatar' />
                <span className='user-name'>{firstName}</span>
                <div
                  style={{ cursor: 'pointer', marginLeft: '20px' }}
                  onClick={handleLogout}
                >
                  Logout
                </div>
              </div>
            ) : (
              <NavLink to='/login' activeClassName='active'>
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default PredectionHeader;
