import React from 'react';
import bg from '../assets/bg.png';
import './home.css';

const Home = () => {
  return (
    <div className="container">
      <div className="left">
        <img src={bg} alt="Saint Patrick's Day" />
      </div>

      <div className="right">
        <h1>🍀 Happy Saint Patrick's Day Mate!! 🍀</h1>
        <h2>Choose any of these games to play</h2>

        <div className="links">
          <a href="/maze" className="btn">🌀 Leprechaun Maze Escape 🏆</a>
          <a href="/coin-collector" className="btn">🪙 Gold Coin Collector 🏆</a>
        </div>
      </div>
    </div>
  );
};

export default Home;
