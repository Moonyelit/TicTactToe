import React, { useState } from "react";
import Square from "./Square";

// Calcul du gagnant
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

export default function Board({ squares, onClick }) {
  // Historique local (différent de l'historique global du Game)
  const [history, setHistory] = useState([]);

  const winnerInfo = calculateWinner(squares);
  let status;
  if (winnerInfo) {
    status = "Gagnant: " + winnerInfo.winner;
  } else if (squares.every(Boolean)) {
    status = "Match nul";
  } else {
    // On détermine le prochain joueur en comptant le nombre de cases remplies
    status = "Prochain joueur: " + (squares.filter(Boolean).length % 2 === 0 ? "X" : "O");
  }

  // Gestion du clic sur une case
  function handleClick(i) {
    const row = Math.floor(i / 3) + 1;
    const col = (i % 3) + 1;

    // On alimente l'historique local
    setHistory([...history, {
      player: squares.filter(Boolean).length % 2 === 0 ? "X" : "O",
      row,
      col
    }]);

    // On remonte l'info au parent (Game)
    onClick(i);
  }

  // Rendu d'une case
  function renderSquare(i) {
    const isWinningSquare = winnerInfo && winnerInfo.line.includes(i);
    return (
      <Square
        value={squares[i]}
        onSquareClick={() => handleClick(i)}
        isWinning={isWinningSquare}
      />
    );
  }

  // Rendu du plateau (3x3)
  function renderBoard() {
    let board = [];
    for (let row = 0; row < 3; row++) {
      let boardRow = [];
      for (let col = 0; col < 3; col++) {
        boardRow.push(renderSquare(row * 3 + col));
      }
      board.push(
        <div key={row} className="board-row">
          {boardRow}
        </div>
      );
    }
    return board;
  }

  return (
    <div className="board-container">
      <div className="status">{status}</div>
      {renderBoard()}

      {/* Nouvelle div pour l'historique local */}
      <div className="history-container">
        <h3>Historique des coups</h3>
        <ul>
          {history.map((step, move) => (
            <li key={move}>
              Joueur {step.player} : Ligne {step.row}, Colonne {step.col}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
