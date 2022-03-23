import React from "react";
import './styles/Board.css';
import Square from "./Square";
import { useState} from "react";

function Board() {

    var status = 'Next player: X';
    const [currBoard, setBoard] = useState(Array(9).fill(null));
    const [currNext, setNext] = useState(true); 

    function handleClick(sq) { 
      const curr = currBoard.slice();
      if (winnerCheck(curr) || curr[sq]) {
        return;
      }
        curr[sq] = currNext ? 'X' : 'O';
        setBoard(curr);
        currNext = setNext(!currNext);
    }

    function winnerCheck(currBoard) { 
      const winningPositioning = 
        [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6]
      ]
      for (let i = 0; i < winningPositioning.length; i++) {
        const [a, b, c] = winningPositioning[i];
        if (currBoard[a] && (currBoard[a] === currBoard[b]) && (currBoard[a] === currBoard[c])) {
          return currBoard[a];
        }
      }
      return null;  
    }

    const winner = winnerCheck(currBoard);

    if (winner){
      status = 'Winner:' + winner;
    } else {
      status = 'Next Player:' + (currNext ? 'X' : 'O')
    }


    function renderSquare(i) {
      return (
      <Square 
      value = {currBoard[i]} 
      onClick = {() => handleClick(i)}/>
      );
    }
    

    return (  
        <div>
          <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
          </div>
          <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
          </div>
          <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
          </div>
          <div className="status">{status}</div>
        </div>
    )
}

export default Board;