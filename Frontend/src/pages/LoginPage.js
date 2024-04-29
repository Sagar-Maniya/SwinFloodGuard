import React from 'react';
import { Link } from 'react-router-dom';
import './LoginPage.css'; // Ensure this path matches your CSS file's location

function LoginPage() {
  return (
    <div className='login'>
      <h1>Login</h1>
      <form>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' name='email' required />
        <label htmlFor='password'>Password</label>
        <input type='password' id='password' name='password' required />
        <button type='submit'>Login</button>
      </form>
      <Link to='/register'>Don't have an account? Register here</Link>
    </div>
  );
}

export default LoginPage;
