import React from 'react';
import Board from './game/Board';
import '.game/game.css';

export default class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      xIsNext: true,
      stepNumber: 0
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const currentSquares = history[history.length - 1];
    const squares = currentSquares.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  }

  render() {
    const history = this.state.history;
    const currentSquares = history[this.state.stepNumber].squares;

    const winner = calculateWinner(currentSquares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    const moves = history.map((squares, move) => {
      const description = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{description}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={currentSquares} status={status} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }

  jumpTo(move) {
    this.setState({
      stepNumber: move,
      xIsNext: move % 2 === 0
    });
  }
}

function calculateWinner(squares) {
  const lines = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
