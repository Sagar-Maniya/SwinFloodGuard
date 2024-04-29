import React, { useState } from 'react';
import './RegisterPage.css';

function RegisterPage() {
  const [user, setUser] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    if (user.password !== user.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Process the registration here (e.g., API call)
    alert('Registration successful');
  };

  return (
    <div className='register'>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
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
