import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const apiUrl = import.meta.env.VITE_BACKEND_URL;

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        console.error('Login failed');
        throw new Error('Login failed');
      }
      const data = await response.json();
      // Save the token to localStorage
      localStorage.setItem("token", data.token);
      // Redirect to the home page
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  }


  return (
    <div className='container'>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
      <div className="mt-3">
        <p>Don't have an account? <Link to="/signup">Signup</Link></p>
      </div>
    </div>
  )
}

export default Login