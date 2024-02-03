import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'
import Signup from './pages/Register'
import HomeScreen from './pages/HomePage'
import Profile from './pages/Profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/home' element={<HomeScreen/>}/>
          <Route path='/profile/:username' element={<Profile/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
