import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios'; // Import axios for making HTTP requests
import './LoginPage.css'; // Ensure this path matches your CSS file's location

function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate(); // Hook to navigate to other routes

  // Update state with form input
  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    try {
      // Make API call to the backend
      const response = await axios.post(
        'http://localhost:8080/user/login',
        credentials,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      alert(response.data.message); // Show login success message
      // Store the token (usually in localStorage for web apps)
      localStorage.setItem('token', response.data.data.token);
      // Redirect to another route, e.g., dashboard or home
      navigate('/'); // Adjust the route as needed
    } catch (error) {
      if (error.response) {
        // Handle errors returned from the backend
        alert(error.response.data.message || 'Failed to login');
      } else {
        alert('The server is not responding. Please try again later.');
      }
    }
  };

  return (
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
  );
}

export default LoginPage;
