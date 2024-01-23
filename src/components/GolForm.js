import React, { useState } from "react";
import "./golForm.css";

const GolForm = ({ action }) => {
  // ------ useStates -------------------
  const [width, setWidth] = useState(31);
  const [height, setHeight] = useState(8);
  const [speed, setSpeed] = useState(4);
  const [template, setTemplate] = useState("random");
  // events ------------------------
  const handleSubmit = (event) => {
    event.preventDefault();
    action(template, width, height, speed);
  };
  const handleChangeTemplate = (event) => {
    setTemplate(event.target.value);
  };
  const handleChangeSpeed = (event) => {
    setSpeed(parseInt(event.target.value));
  };
  const handleChangeWidth = (event) => {
    setWidth(parseInt(event.target.value));
  };
  const handleChangeHeight = (event) => {
    setHeight(parseInt(event.target.value));
  };
  // Rending -----------------------------------------------
  return (
    <form className="">
      <div className="golform">
        <label htmlFor="game-template">Template</label>
        <select
          name="Game selection"
          id="game-template"
          onChange={handleChangeTemplate}
        >
          <option value="random">Random Grid</option>
          <option value="robot">Robot</option>
          <option value="dead">DEAD</option>
          <option value="alive">ALIVE</option>
          <option value="A">A</option>
        </select>
        <label htmlFor="game-speed">
          Speed (* 0.1s)<span className="infobulle">1 to 20</span>
        </label>
        <input
          type="number"
          id="game-speed"
          title="1 - 20"
          value={speed}
          min="1"
          max="20"
          step="1"
          onChange={handleChangeSpeed}
        />
        <label htmlFor="game-width">
          Board Width<span className="infobulle">3 to 31</span>
        </label>
        <input
          type="number"
          id="game-width"
          title="Available only with the Random Grid Template"
          value={width}
          min="3"
          max="31"
          step="1"
          onChange={handleChangeWidth}
        />
        <label htmlFor="game-height">
          Board Height<span className="infobulle">3 to 31</span>
        </label>
        <input
          type="number"
          id="game-height"
          title="Available only with the Random Grid Template"
          value={height}
          min="3"
          max="31"
          step="1"
          onChange={handleChangeHeight}
        />
      </div>
      <button type="submit" onClick={handleSubmit}>
        Validate
      </button>
    </form>
  );
};

export default GolForm;
