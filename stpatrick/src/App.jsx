import React, { useState, useEffect } from "react";
import "./App.css";

const initialMaze = [
  ["S", " ", "X", "X", "X", "X"],
  ["X", " ", "X", " ", " ", "X"],
  ["X", " ", " ", " ", "X", "X"],
  ["X", "X", "X", " ", "X", "X"],
  ["X", " ", " ", " ", " ", "E"]
];

const MazeGame = () => {
  const [playerPos, setPlayerPos] = useState({ row: 0, col: 0 });
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  // Function to move player
  const movePlayer = (direction) => {
    let { row, col } = playerPos;

    if (direction === "up" && row > 0 && initialMaze[row - 1][col] !== "X") row--;
    else if (direction === "down" && row < initialMaze.length - 1 && initialMaze[row + 1][col] !== "X") row++;
    else if (direction === "left" && col > 0 && initialMaze[row][col - 1] !== "X") col--;
    else if (direction === "right" && col < initialMaze[0].length - 1 && initialMaze[row][col + 1] !== "X") col++;

    setPlayerPos({ row, col });

    if (initialMaze[row][col] === "E") {
      alert("🎉 You found the pot of gold! 🏆🍀");
      setPlayerPos({ row: 0, col: 0 }); // Reset position
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
  }, [playerPos]);

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

  return (
    <div 
      className="maze-container" 
      onTouchStart={handleTouchStart} 
      onTouchEnd={handleTouchEnd}
    >
      <h1>🍀 Leprechaun Maze Escape 🏆</h1>
      <div className="maze">
        {initialMaze.map((row, rowIndex) =>
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
    </div>
  );
};

export default MazeGame;
