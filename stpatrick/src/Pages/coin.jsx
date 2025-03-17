import React, { useState, useEffect, useRef } from "react";
import "./coin.css";
import { Link } from "react-router-dom";
import home from "../assets/home.svg";
import potImage from "../assets/pot.png"; 
import luckyCoinImage from "../assets/luckyCoinImage.svg"; 
import normalCoinImage from "../assets/normalCoinImage.svg"; 

import normalCoinSound from "../assets/coin.mp3"; 
import specialCoinSound from "../assets/coin2.mp3";
const GoldCollector = () => {
  const [potPosition, setPotPosition] = useState(50);
  const [coins, setCoins] = useState([]);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0); 
  const [specialMessage, setSpecialMessage] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30-second timer
  const gameAreaRef = useRef(null);

  const normalCoinAudio = new Audio(normalCoinSound);
  const specialCoinAudio = new Audio(specialCoinSound);

  useEffect(() => {
    const savedHighScore = localStorage.getItem("highScore");
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore, 10));
    }
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem("highScore", score.toString());
    }
  }, [score, highScore]);

  const createCoin = () => {
    setCoins((prev) => [
      ...prev,
      {
        id: Math.random(),
        left: Math.random() * 90,
        isSpecial: Math.random() < 0.2, 
        top: 0,
      },
    ]);
  };

  // Move pot left and right
  const movePot = (direction) => {
    setPotPosition((prev) => {
      let newPos = direction === "left" ? prev - 10 : prev + 10;
      return Math.max(0, Math.min(newPos, 90)); // Keep within screen bounds
    });
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft") movePot("left");
      if (e.key === "ArrowRight") movePot("right");
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  // Drop coins at intervals
  useEffect(() => {
    const interval = setInterval(createCoin, 1000);
    return () => clearInterval(interval);
  }, []);

  // Handle coin fall and collision detection
  useEffect(() => {
    const coinFallInterval = setInterval(() => {
      setCoins((prevCoins) =>
        prevCoins
          .map((coin) => ({ ...coin, top: coin.top + 2 })) // Adjust fall speed
          .filter((coin) => {
            const isCaught =
              coin.top >= 75 && Math.abs(coin.left - potPosition) < 10;

            if (isCaught) {
              setScore((prev) => prev + (coin.isSpecial ? 5 : 1)); // Special coins give +5 points

              // Play sound effect
              if (coin.isSpecial) {
                specialCoinAudio.play();
                setSpecialMessage("🌟 Lucky Coin! +5 Points! 🌟");
                setTimeout(() => setSpecialMessage(null), 1500); // Message disappears
              } else {
                normalCoinAudio.play();
              }

              return false; // Remove caught coins
            }

            if (coin.top >= 100) {
              return false; // Remove coins that reach the bottom
            }

            return true;
          })
      );
    }, 50); // Adjust interval for smoother animation

    return () => clearInterval(coinFallInterval);
  }, [potPosition]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0 && !gameOver) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setGameOver(true); // End the game when time runs out
    }
  }, [timeLeft, gameOver]);

  // Reset game
  const resetGame = () => {
    setCoins([]);
    setScore(0);
    setGameOver(false);
    setTimeLeft(30); // Reset timer to 30 seconds
  };

  return (
    <div className="game-container">
      <Link  to="/" className="home-link">
      <img src={home} alt="" />
      </Link>
      <h1>🪙 Gold Coin Collector 🏺</h1>
      <p>Score: {score}</p>
      <p>High Score: {highScore}</p>
      <p>Time Left: {timeLeft} seconds</p>

      {specialMessage && <div className="special-message">{specialMessage}</div>}

      {gameOver ? (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Final Score: {score}</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      ) : (
        <div className="game-area" ref={gameAreaRef}>
          {coins.map((coin) => (
            <div
              key={coin.id}
              className={`coin ${coin.isSpecial ? "special-coin" : ""}`}
              style={{ left: `${coin.left}%`, top: `${coin.top}%` }}
            >
              <img
                src={coin.isSpecial ? luckyCoinImage : normalCoinImage}
                alt={coin.isSpecial ? "Lucky Coin" : "Normal Coin"}
                className="coin-image"
              />
            </div>
          ))}

          <div
            className="collector-pot"
            style={{ left: `${potPosition}%` }}
          >
            <img src={potImage} alt="Pot" className="pot-image" />
          </div>
        </div>
      )}

      {/* Mobile Controls */}
      <div className="mobile-controls">
        <button className="control-button" onClick={() => movePot("left")}>
          ←
        </button>
        <button className="control-button" onClick={() => movePot("right")}>
          →
        </button>
      </div>

      <p>Use ← and → keys or tap the buttons to move the pot!</p>
    </div>
  );
};

export default GoldCollector;