import "./App.css";
import React, { useEffect, useState } from "react";
import { Header, Ranking, Game } from "./component/index.js";

function App() {
  const [menu, setMenu] = useState("game");
  const [time, setTime] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const onChangeMenu = (newMenu) => {
    setMenu(newMenu);
  };

  useEffect(() => {
    let timer;
    if (isTimerRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 0.1);
      }, 100);
    }
    return () => clearInterval(timer);
  }, [isTimerRunning]);

  const startTimer = (state) => {
    setIsTimerRunning(state);
    if (!state) {
      // 타이머 종료 시
      setTime(0);
      setMenu("ranking");
    }
  };

  return (
    <>
      <Header menu={menu} onChange={onChangeMenu} time={time.toFixed(1)} />
      {menu === "game" ? <Game startTimer={startTimer} /> : <Ranking />}
    </>
  );
}

export default App;
