import React, { useState } from "react";

function Board() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [nextValue, setNextValue] = useState("X");

  function selectSquare(square) {
    if (squares[square] || calculateWinner(squares)) {
      return;
    }
    const squaresCopy = [...squares];
    squaresCopy[square] = nextValue;
    setSquares(squaresCopy);
    setNextValue(calculateNextValue(squaresCopy));
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setNextValue("X");
  }

  function renderSquare(i) {
    return (
      <button className="square p-4 m-1 bg-sky-700 text-white" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );
  }
  const winner = calculateWinner(squares);
  const status = calculateStatus(winner, squares, nextValue);

  return (
    <div className="flex flex-col items-center text-center justify-center w-screen h-screen">
      <div className="my-2">STATUS : {status}</div>
      <div className="square">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div>
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div>
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button onClick={restart} className="my-2">
        restart
      </button>
    </div>
  );
}

function Game() {
  return (
    <div>
      <div>
        <Board />
      </div>
    </div>
  );
}

function calculateStatus(winner, squares, nextValue) {
  return winner ? `Winner: ${winner}` : squares.every(Boolean) ? `Scratch: Cat's game` : `Next player: ${nextValue}`;
}

function calculateNextValue(squares) {
  return squares.filter(Boolean).length % 2 === 0 ? "X" : "O";
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function App() {
  return <Game />;
}

export default App;
