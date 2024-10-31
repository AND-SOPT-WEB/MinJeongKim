import "./App.css";
import React, { useEffect, useState } from "react";
import { Header, Ranking, Game } from "./component/index.js";

function App() {
  const [menu, setMenu] = useState("game");
  const [time, setTime] = useState(0);
  const [level, setLevel] = useState("level1");
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  /**
   * @description 타이머 시작/종료
   * @param state
   */
  const setTimer = (state) => {
    setTime(0);
    setIsTimerRunning(state);
  };

  useEffect(() => {
    let timer;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 0.01);
      }, 10);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning]);

  return (
    <>
      <Header
        menu={menu}
        setMenu={setMenu}
        level={level}
        setLevel={setLevel}
        time={time.toFixed(2)}
        setTimer={setTimer}
      />
      {menu === "game" ? (
        <Game
          level={level}
          time={time}
          setTimer={setTimer}
          setIsTimerRunning={setIsTimerRunning}
        />
      ) : (
        <Ranking setTimer={setTimer} />
      )}
      <div id="modal-root"></div>
    </>
  );
}

export default App;
