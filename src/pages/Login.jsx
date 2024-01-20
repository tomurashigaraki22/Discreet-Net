import React from "react";
import jwt_decode from 'jwt-decode';
import { useEffect, useState } from "react";
import { LOGIN_TEST } from "../../config";

const Login = () => {
  // Handle login logic here
  const [username, setUsername] = useState('')
  const [password, setpassword] = useState('')

  const onlogin = () => {
    console.log('login')
    const formdata = new FormData()
    formdata.append('username', username)
    formdata.append('password', password)

    fetch(`${LOGIN_TEST}`, {
        method: 'POST',
        body: formdata
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Data: ', data)
        console.log(data.message)
        if (data.status === 200){
            console.log('Login Worked')
        }
    })

  }

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Login</h2>
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
          onClick={onlogin}
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
