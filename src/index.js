import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Board from './Board';

class Game extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
      firstPlayer: { name: prompt('First player name: '), score: 0 },
      secondPlayer: { name: prompt('Second player name: '), score: 0 },
      gameStatus: null,
    };
  }

  handleClick (i) {
    const squares = this.state.squares.slice();

    if (calculateWinner(squares)[0] || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? 'cross' : 'circle';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });

    let a = squares.find(ell => ell === null);

    if (a === undefined && calculateWinner(squares)[0] === null) {
      this.setState({
        gameStatus: 'Ничья! Сыграем еще раз!'
      })
      this.clearField();
    }

    if (calculateWinner(squares)[0] === 'cross') {
      this.setState({
        firstPlayer: { name: this.state.firstPlayer.name, score: this.state.firstPlayer.score + 1 },
        gameStatus: 'Победа за ' + this.state.firstPlayer.name + '!'
      });
      this.clearField();
    }
    if (calculateWinner(squares)[0] === 'circle') {
      this.setState({
        secondPlayer: { name: this.state.secondPlayer.name, score: this.state.secondPlayer.score + 1 },
        gameStatus: 'Победа за ' + this.state.secondPlayer.name + '!'
      });
      this.clearField();
    }
  }

  clearField () {
    setTimeout(() => {
      this.setState({
        squares: Array(9).fill(null),
        gameStatus: null
      })
    }, 3000)
  }

  render () {
    const winClass = calculateWinner(this.state.squares)[1];

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={this.state.squares}
            onClick={(i) => this.handleClick(i)}
            className={winClass}
          />
        </div>
        <div className="game-info">
          <div className="status">Score</div>
          <div>{this.state.firstPlayer.name}: {this.state.firstPlayer.score}</div>
          <div>{this.state.secondPlayer.name}: {this.state.secondPlayer.score}</div>
          <div>{this.state.gameStatus}</div>
        </div>
      </div>
    );
  }
}

// возвращает массив побелителя ['x', 'class']
function calculateWinner (squares) {
  const lines = [
    [0, 1, 2, 'g-top'],
    [3, 4, 5, 'g-midle'],
    [6, 7, 8, 'g-bottom'],
    [0, 3, 6, 'v-left'],
    [1, 4, 7, 'v-midle'],
    [2, 5, 8, 'v-right'],
    [0, 4, 8, 'l-cross'],
    [2, 4, 6, 'r-cross'],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return [squares[a], lines[i][3]];
    }
  }
  return [null, 'none'];
}
// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);
