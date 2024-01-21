import React, { useState } from "react";
import 'react-activity/dist/library.css';
import { Dots } from 'react-activity';
import { SIGNUP_TEST } from "../../config";
import { Link } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [signingUp, setSigningUp] = useState(false);
  const [signupError, setSignupError] = useState(false);
  const [uale, setuale] = useState(false)

  const onSignup = async () => {
    const formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    
    try {
      setSigningUp(true);
      setSignupError(false);

      const response = await fetch(`${SIGNUP_TEST}`, {
        method: 'POST',
        body: formData,
      });
      console.log(response)

      const resp2 = await response.json();

      if (resp2.status === 200) {
        console.log('Signup successful');
        setSigningUp(false);
      } else if (resp2.status === 409) {
        console.log('Username already exists');
        setuale(true)
        setSigningUp(false);
      } else {
        // Handle other error cases
        console.error('Unexpected error occurred.');
        setSigningUp(true)
        setSigningUp(false);
      }
    } catch (error) {
      console.error('Error during signup:', error);
      setSigningUp(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center">
      <div className="text-white mb-7 text-4xl font-bold">DiscreetNet</div>
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Sign Up</h2>
        {uale && (
          <p className="text-red-500 mb-4">Username already exists. Please choose a new one.</p>
        )}
        {signupError && (
          <p className="text-red-500 mb-4">Unknown Error Occured. Please Try Again</p>
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
          onClick={onSignup}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          {signingUp ? <Dots color="#fff" /> : 'Sign Up'}
        </button>
        <p className="text-sm mt-3">Already have an account, Login <Link to='/' className="underline font-bold">Here</Link></p>
      </div>
    </div>
  );
};

export default Signup;
