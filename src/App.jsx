import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
