import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';
import Header from '../components/Header';

function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:8080/user/login',
        credentials,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { token, user } = response.data.data;

      localStorage.setItem('token', token);
      localStorage.setItem('firstName', user.first_name);
      localStorage.setItem('isLoggedIn', 'true');
      navigate('/flood-predictions');
    } catch (error) {
      if (error.response) {
        alert(error.response.data.message || 'Failed to login');
      } else {
        alert('The server is not responding. Please try again later.');
      }
    }
  };

  return (
    <>
      <Header />
      <div className='login'>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor='email'>Email</label>
          <input
            type='email'
            id='email'
            name='email'
            value={credentials.email}
            onChange={handleChange}
            required
          />
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            name='password'
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type='submit'>Login</button>
        </form>
        <Link to='/register'>Don't have an account? Register here</Link>
      </div>
    </>
  );
}

export default LoginPage;
