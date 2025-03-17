import React, { useState, useEffect } from "react";
import "./maze.css";

// Function to generate a random maze
const generateMaze = (rows, cols) => {
  let maze = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => (Math.random() > 0.3 ? " " : "X")) // 30% walls
  );

  // Ensure start & goal points
  maze[0][0] = "S"; // Start
  maze[rows - 1][cols - 1] = "E"; // End

  return maze;
};

const MazeGame = () => {
  const [maze, setMaze] = useState(generateMaze(6, 6)); // 6x6 grid
  const [playerPos, setPlayerPos] = useState({ row: 0, col: 0 });
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [timeLeft, setTimeLeft] = useState(20); // 20-second timer
  const [gameOver, setGameOver] = useState(false);
  const [mazesSolved, setMazesSolved] = useState(0); // Track solved mazes


  
  // Function to move player
  const movePlayer = (direction) => {
    if (gameOver) return; // Prevent movement if game is over

    let { row, col } = playerPos;

    if (direction === "up" && row > 0 && maze[row - 1][col] !== "X") row--;
    else if (direction === "down" && row < maze.length - 1 && maze[row + 1][col] !== "X") row++;
    else if (direction === "left" && col > 0 && maze[row][col - 1] !== "X") col--;
    else if (direction === "right" && col < maze[0].length - 1 && maze[row][col + 1] !== "X") col++;

    setPlayerPos({ row, col });

    if (maze[row][col] === "E") {
      setMazesSolved((prev) => prev + 1); // Increment solved mazes
      resetMaze(); // Generate a new maze
    }
  };

  // Handle keyboard movement (for desktops)
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "ArrowUp") movePlayer("up");
      else if (e.key === "ArrowDown") movePlayer("down");
      else if (e.key === "ArrowLeft") movePlayer("left");
      else if (e.key === "ArrowRight") movePlayer("right");
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [playerPos, gameOver]);

  // Handle touch gestures (for mobile)
  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX + "," + e.touches[0].clientY);
  };

  const handleTouchEnd = (e) => {
    setTouchEnd(e.changedTouches[0].clientX + "," + e.changedTouches[0].clientY);

    if (touchStart && touchEnd) {
      const [startX, startY] = touchStart.split(",").map(Number);
      const [endX, endY] = touchEnd.split(",").map(Number);
      const diffX = endX - startX;
      const diffY = endY - startY;

      if (Math.abs(diffX) > Math.abs(diffY)) {
        // Horizontal Swipe
        if (diffX > 50) movePlayer("right");
        else if (diffX < -50) movePlayer("left");
      } else {
        // Vertical Swipe
        if (diffY > 50) movePlayer("down");
        else if (diffY < -50) movePlayer("up");
      }
    }
  };

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

  // Function to reset the maze (without resetting the timer or score)
  const resetMaze = () => {
    setMaze(generateMaze(6, 6)); // Generate new random maze
    setPlayerPos({ row: 0, col: 0 }); // Reset player position
  };

  // Function to reset the game
  const resetGame = () => {
    setMaze(generateMaze(6, 6)); // Generate new random maze
    setPlayerPos({ row: 0, col: 0 }); // Reset player position
    setTimeLeft(20); // Reset timer
    setGameOver(false); // Reset game over state
    setMazesSolved(0); // Reset solved mazes
  };

  return (
    <div className="maze-container" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
      <h1>🍀 Leprechaun Maze Escape 🏆</h1>
      <p>Time Left: {timeLeft} seconds</p>
      <p>Mazes Solved: {mazesSolved}</p>

      {gameOver ? (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>You solved {mazesSolved} mazes in 20 seconds!</p>
          <button className="reset-btn" onClick={resetGame}>🔄 Play Again</button>
        </div>
      ) : (
        <>
          <button className="reset-btn" onClick={resetMaze}>🔄 New Maze</button>
          <div className="maze">
            {maze.map((row, rowIndex) =>
              row.map((cell, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={`cell ${cell === "X" ? "wall" : ""} ${cell === "E" ? "goal" : ""} ${
                    playerPos.row === rowIndex && playerPos.col === colIndex ? "player" : ""
                  }`}
                >
                  {cell === "E" ? "🏆" : playerPos.row === rowIndex && playerPos.col === colIndex ? "🧑‍🌾" : ""}
                </div>
              ))
            )}
          </div>
        </>
      )}

      {/* Mobile Arrow Controls */}
      <div className="mobile-controls">
        <button className="control-button" onClick={() => movePlayer("up")}>⬆️</button>
        <button className="control-button" onClick={() => movePlayer("down")}>⬇️</button>
        <button className="control-button" onClick={() => movePlayer("left")}>⬅️</button>
        <button className="control-button" onClick={() => movePlayer("right")}>➡️</button>
      </div>
    </div>
  );
};

export default MazeGame;