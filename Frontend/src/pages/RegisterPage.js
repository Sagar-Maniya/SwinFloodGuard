import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './RegisterPage.css';
import Header from '../components/Header';

function RegisterPage() {
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
    otp: '',
  });
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [id, setId] = useState(0);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setError('');
    if (!validateEmail(user.email)) {
      setError('Invalid email format');
      return;
    }
    if (user.password.length < 8) {
      setError('Password must be at least 8 characters long');
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
      alert('OTP send successful');
      setId(response.data.message);
      setOtpSent(true);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!otpSent) {
      setError('Please send OTP first');
      return;
    }

    const payload = {
      otp: user.otp,
    };

    try {
      const response = await axios.post(
        `http://localhost:8080/user/${id}/validate-otp`,
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      alert('Registration successful: ' + response.data.message);
      navigate('/login');
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

  const validateEmail = (email) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return re.test(String(email).toLowerCase());
  };

  return (
    <>
      <Header />
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

          {otpSent ? (
            <>
              <label htmlFor='otp'>Enter OTP</label>
              <input
                type='text'
                id='otp'
                name='otp'
                required
                onChange={handleChange}
              />
            </>
          ) : (
            <button type='button' onClick={handleSendOtp}>
              Send OTP
            </button>
          )}

          <button type='submit'>Register</button>
        </form>
      </div>
    </>
  );
}

export default RegisterPage;
