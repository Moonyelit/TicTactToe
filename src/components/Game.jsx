import React, { useState } from "react";
import Board from "./Board";

// Calcul du gagnant (identique à Board, mais utilisé pour l'historique global)
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

export default function Game() {
  // Historique global
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  const currentSquares = history[stepNumber];
  const winnerInfo = calculateWinner(currentSquares);

  // Quand on clique sur une case du Board
  function handleClick(i) {
    const historyUpToCurrentStep = history.slice(0, stepNumber + 1);
    const current = historyUpToCurrentStep[historyUpToCurrentStep.length - 1];
    const squares = current.slice();

    // Si on a un gagnant ou si la case est déjà prise, on ne fait rien
    if (winnerInfo || squares[i]) {
      return;
    }

    // On place X ou O
    squares[i] = xIsNext ? "X" : "O";
    setHistory(historyUpToCurrentStep.concat([squares]));
    setStepNumber(historyUpToCurrentStep.length);
    setXIsNext(!xIsNext);
  }

  // Permet de revenir à un tour antérieur
  function jumpTo(step) {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  }

  // Création de la liste de coups pour l'historique global
  const moves = history.map((squares, move) => {
    const desc = move
      ? "Revenir au tour n°" + move
      : "Revenir au début de la partie";
    if (move === stepNumber) {
      return (
        <li key={move}>
          <span>Vous êtes au coup #{move}</span>
        </li>
      );
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  // Affichage du statut global
  let status;
  if (winnerInfo) {
    status = winnerInfo.winner + " a gagné";
  } else if (currentSquares.every(Boolean)) {
    status = "Match nul";
  } else {
    status = "Prochain tour : " + (xIsNext ? "X" : "O");
  }

  return (
    <div className="game">
      <div className="game-board">
        {/* On passe les squares et la fonction de clic à Board */}
        <Board squares={currentSquares} onClick={(i) => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
