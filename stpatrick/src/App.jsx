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

  useEffect(() => {
    const handleKeyPress = (e) => {
      let { row, col } = playerPos;

      if (e.key === "ArrowUp" && row > 0 && initialMaze[row - 1][col] !== "X")
        row--;
      else if (e.key === "ArrowDown" && row < initialMaze.length - 1 && initialMaze[row + 1][col] !== "X")
        row++;
      else if (e.key === "ArrowLeft" && col > 0 && initialMaze[row][col - 1] !== "X")
        col--;
      else if (e.key === "ArrowRight" && col < initialMaze[0].length - 1 && initialMaze[row][col + 1] !== "X")
        col++;

      setPlayerPos({ row, col });

      if (initialMaze[row][col] === "E") {
        alert("🎉 You found the pot of gold! 🏆🍀");
        setPlayerPos({ row: 0, col: 0 }); // Reset position
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [playerPos]);

  return (
    <div className="maze-container">
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
