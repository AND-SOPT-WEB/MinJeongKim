import "./App.css";
import React, { useEffect, useState } from "react";
import { Header, Ranking, Game } from "./component/index.js";

function App() {
  const [menu, setMenu] = useState("game");
  const [time, setTime] = useState(0);
  const [level, setLevel] = useState("level1");

  return (
    <>
      <Header
        menu={menu}
        setMenu={setMenu}
        level={level}
        setLevel={setLevel}
        time={time.toFixed(1)}
      />
      {menu === "game" ? (
        <Game
          level={level}
          setLevel={setLevel}
          setMenu={setMenu}
          time={time}
          setTime={setTime}
        />
      ) : (
        <Ranking />
      )}
    </>
  );
}

export default App;
