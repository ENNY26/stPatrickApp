import React from 'react'
import bg from '../assets/bg.png'
import './home.css'
const home = () => {
  return (
    <div>

      <div className='left'>
    <img src={bg} alt="" />
      </div>

      <div className='right'>
      <h1>Happy saint Patricks day Mate!!</h1>
      <h2>choose any of this games to play</h2>

      <div className='links' >
      <a  href='/maze' className='btn'>🍀 Leprechaun Maze Escape 🏆</a>
      <a href='/coin' className='btn'>🪙 Gold Coin Collector 🏆</a>
      </div>
      </div>
    </div>
  )
}

export default home