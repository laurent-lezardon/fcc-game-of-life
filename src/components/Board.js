import React from "react";
import "./board.css";

const Board = ({ values }) => {
  return (
    <div className="board">
      {values.map((v, i) => {
        return (
          <div className="boardline" key={`line-${i}`}>
            {values[i].map((v, index) => {
              return v === 0 ? (
                <div key={`plot-${index}`} className="plot dead"></div>
              ) : (
                <div key={`plot-${index}`} className="plot alive"></div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Board;
