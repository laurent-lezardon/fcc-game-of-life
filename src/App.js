import * as gol from "./gol-functions";
import { wordAlive, imgRobot, wordDead, letterA } from "./gol-templates";
import { useEffect, useState } from "react";
import Board from "./components/Board";
import GolForm from "./components/GolForm";
import "./App.css";

function App() {
  const [gameWidth, setGameWidth] = useState(31);
  const [gameHeight, setGameHeight] = useState(8);
  const [gameSpeed, setGameSpeed] = useState(5);
  const [day, setDay] = useState(0);
  const [board, setBoard] = useState(gol.randomBoard(31, 8));
  const [play, setPlay] = useState(false);
  // variable
  let lifeArray = [...board];
  // App fonctions ====================================================
  // Apply parameters set in the GolForm componant ----------
  const setNewParams = (template, width = 5, height = 5, speed = 8) => {
    setGameSpeed(speed);
    setDay(0);
    if (template === "random") {
      setGameWidth((previous) => width);
      setGameHeight((previous) => height);
      lifeArray = gol.randomBoard(width, height);
      setBoard([...lifeArray]);
    } else {
      switch (template) {
        case "robot":
          lifeArray = [...imgRobot];
          setBoard([...lifeArray]);
          setGameWidth(10);
          setGameHeight(10);
          break;
        case "dead":
          lifeArray = [...wordDead];
          setGameWidth(28);
          setGameHeight(8);
          setBoard([...lifeArray]);
          break;
        case "alive":
          lifeArray = [...wordAlive];
          setGameWidth(31);
          setGameHeight(8);
          setBoard([...lifeArray]);
          break;
        case "A":
          lifeArray = [...letterA];
          setBoard([...lifeArray]);
          setGameWidth(7);
          setGameHeight(8);
          break;
        default:
          console.error("template not find");
      }
    }
  };

  // nexDay play the game step by step
  const nextDay = () => {
    lifeArray = gol.nextBoard(
      gol.createBackgroundGame(lifeArray, gameWidth, gameHeight),
      gameWidth,
      gameHeight
    );
    setBoard([...lifeArray]);
    setDay((day) => day + 1);
  };
  // reset the board and the day counter  -------------------
  const reset = () => {
    setBoard(gol.createGame(gameWidth, gameHeight));
    setDay(0);
  };

  // useEffect play in automatic mode if play === true
  useEffect(() => {
    if (play) {
      const interval = setInterval(nextDay, gameSpeed * 100);
      return () => clearInterval(interval);
    }
  }, [play]);
  // Render ===============================================================
  return (
    <div className="App">
      <h1>
        Game of life <i className="fa-solid fa-flask-vial"></i>
      </h1>
      <h2>Board</h2>
      <Board values={lifeArray} />
      <div className="game">
        <button
          onClick={() => {
            setPlay(!play);
          }}
        >
          Start / Pause / Play
        </button>
        <button onClick={nextDay}>next day</button>
        <div>
          <span className="day">day</span>
          <span>{day}</span>
        </div>
        <button onClick={reset}>Reset</button>
      </div>
      <hr></hr>
      <h2>Parameters</h2>
      <GolForm action={setNewParams} />
    </div>
  );
}

export default App;
