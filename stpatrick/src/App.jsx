import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Pages/home'
import MazeGame from './Pages/maze'
import Coin from './Pages/coin'
const App = () => {
  return (
    <div>
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/maze" element={<MazeGame />} />
        <Route path="/coin" element={<Coin />} />
      </Routes>
    </div>
  )
}

export default App