import React from "react";
import 'react-activity/dist/library.css';
import { Dots } from 'react-activity';
import { useEffect, useState } from "react";
import { LOGIN_TEST } from "../../config";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logging, setLogging] = useState(false);
  const navigate = useNavigate();
  const [incorrectUop, setIncorrectUop] = useState(false);

  const onLogin = async () => {
    console.log('login');
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    
    try {
      setLogging(true);
      setIncorrectUop(false);

      const response = await fetch(`${LOGIN_TEST}`, {
        method: 'POST',
        body: formData,
      });

      const resp2 = await response.json();

      if (resp2.status === 200) {
        console.log('Login worked');
        setLogging(false);
        localStorage.setItem('token', resp2.token)
        navigate('/home')
      } else if (resp2.status === 404) {
        console.log('Incorrect uop');
        setIncorrectUop(true);
        setLogging(false);
      } else {
        // Handle other error cases
        console.error('Unexpected error occurred.');
        setLogging(false);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setLogging(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <div className="text-white mb-7 text-4xl font-bold">DiscreetNet</div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-[300px] md:w-[700px] sm:w-[500px]">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Login</h2>
        {incorrectUop && (
          <p className="text-red-500 mb-4">Incorrect username or password.</p>
        )}
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-800 font-semibold mb-2">
            Username
          </label>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type='text'
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Your username"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-800 font-semibold mb-2">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
            placeholder="Your password"
            required
          />
        </div>
        <button
          onClick={onLogin}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          {logging ? <Dots color="#fff" /> : 'Login'}
        </button>
        <p className="text-sm mt-3">Don't have an account, Sign Up <Link to='/signup' className="underline font-bold">Here</Link></p>
      </div>
    </div>
  );
};

export default Login;
