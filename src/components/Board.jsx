import React, { useState } from "react";
import Square from "./Square";

export default function Board({ squares, onClick }) {
  const [history, setHistory] = useState([]);

  const winnerInfo = calculateWinner(squares);
  let status;
  if (winnerInfo) {
    status = "Gagnant: " + winnerInfo.winner;
  } else if (squares.every(Boolean)) {
    status = "Match nul";
  } else {
    status = "Prochain joueur: " + (squares.filter(Boolean).length % 2 === 0 ? "X" : "O");
  }

  function handleClick(i) {
    const row = Math.floor(i / 3) + 1;
    const col = (i % 3) + 1;
    setHistory([...history, { player: squares.filter(Boolean).length % 2 === 0 ? "X" : "O", row, col }]);
    onClick(i);
  }

  function renderSquare(i) {
    const isWinningSquare = winnerInfo && winnerInfo.line.includes(i);
    return <Square value={squares[i]} onSquareClick={() => handleClick(i)} isWinning={isWinningSquare} />;
  }

  function renderBoard() {
    let board = [];
    for (let row = 0; row < 3; row++) {
      let boardRow = [];
      for (let col = 0; col < 3; col++) {
        boardRow.push(renderSquare(row * 3 + col));
      }
      board.push(<div key={row} className="board-row">{boardRow}</div>);
    }
    return board;
  }

  return (
    <>
      <div className={`status ${!winnerInfo && squares.every(Boolean) ? 'draw' : ''}`}>{status}</div>
      {renderBoard()}
      <div className="game-info">
        <ol>
          {history.map((step, move) => (
            <li key={move}>
              {`Joueur ${step.player} : Ligne ${step.row}, Colonne ${step.col}`}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
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
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}
