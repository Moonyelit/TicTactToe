import React from "react";

// Composant fonctionnel Square
function Square({ value, onSquareClick }) {
    return (
      // Bouton représentant une case du jeu
      <button className="square" onClick={onSquareClick}>
        {value}
      </button>
    );
  }
  
export default Square;
