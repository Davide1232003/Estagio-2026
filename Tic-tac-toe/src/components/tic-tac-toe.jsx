import { useState } from "react";
import useTictacToe from "../hooks/use-tic-tac-toe";
import Button from "./button";

function TicTacToe() {
  const { board, handleClick, resetGame, getStatusMessage, scores } =
    useTictacToe();

  return (
    <div className="game-container">
      <div className="game">
        <div className="status">
          {getStatusMessage()}
          <button className="reset-button" onClick={resetGame}>
            Reset Game
          </button>
        </div>

        <div className="board">
          {board.map((b, index) => (
            <Button
              className="cell"
              key={index}
              onClick={() => handleClick(index)}
              disabled={b !== null}
            >
              {b}
            </Button>
          ))}
        </div>
      </div>

      <div className="historico">
        <h3>Nº Vitórias</h3>
        <div className="score-item">Jogador X: {scores.x}</div>
        <div className="score-item">Jogador O: {scores.o}</div>
      </div>
    </div>
  );
}

export default TicTacToe;
