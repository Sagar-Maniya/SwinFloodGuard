import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './RegisterPage.css';

function RegisterPage() {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize the navigate function

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors
    if (user.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    if (user.password !== user.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    const payload = {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      password: user.password,
    };

    try {
      const response = await axios.post(
        'http://localhost:8080/user/register',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Registration successful: ' + response.data.message);
      navigate('/login'); // Redirect to the login page
    } catch (err) {
      if (err.response) {
        setError(
          err.response.data.message || 'An error occurred during registration'
        );
      } else {
        setError('The server is not responding. Please try again later.');
      }
    }
  };

  return (
    <div className='register'>
      <h1>Register</h1>
      {error && <p className='error'>{error}</p>}
      <form onSubmit={handleSubmit}>
        <label htmlFor='first_name'>First Name</label>
        <input
          type='text'
          id='first_name'
          name='first_name'
          required
          onChange={handleChange}
        />

        <label htmlFor='last_name'>Last Name</label>
        <input
          type='text'
          id='last_name'
          name='last_name'
          required
          onChange={handleChange}
        />

        <label htmlFor='email'>Email</label>
        <input
          type='email'
          id='email'
          name='email'
          required
          onChange={handleChange}
        />

        <label htmlFor='password'>Password</label>
        <input
          type='password'
          id='password'
          name='password'
          required
          onChange={handleChange}
          minLength='6'
        />

        <label htmlFor='confirmPassword'>Confirm Password</label>
        <input
          type='password'
          id='confirmPassword'
          name='confirmPassword'
          required
          onChange={handleChange}
        />

        <button type='submit'>Register</button>
      </form>
    </div>
  );
}

export default RegisterPage;
