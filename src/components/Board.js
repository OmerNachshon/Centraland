import React from "react";
import Square from "./Square";

const Board = ({ squares, onClick, user, setLands }) => (
  <div className="board">
    {squares.map((square, i) => (
      <Square setLands={setLands} key={i} value={square} user={user} onClick={() => onClick(i)} />
    ))}
  </div>
);

export default Board;
