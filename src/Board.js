import React from 'react';
import Square from "./Square";
import './Board.css';

class Board extends React.Component {

  renderSquare (i) {
    return (
      <Square
        className={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render () {
    return (
      <div className="board-box">
        <div className={this.props.className}></div>
        <div className="g-line-top"></div>
        <div className="v-line-top"></div>
        <div className="g-line-bottom"></div>
        <div className="v-line-bottom"></div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;