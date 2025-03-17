import React from "react";

// Composant fonctionnel Square
function Square({ value, onSquareClick, isWinning }) {
    return (
      // Bouton représentant une case du jeu
      <button className={`square ${isWinning ? 'winning' : ''}`} onClick={onSquareClick}>
        {value}
      </button>
    );
  }
  
export default Square;
