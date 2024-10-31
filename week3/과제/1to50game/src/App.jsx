import "./App.css";
import React, { useState } from "react";
import { Header, Ranking, Game } from "./component/index.js";

function App() {
  const [menu, setMenu] = useState("game");

  return (
    <>
      <Header />
      {menu === "game" ? <Game /> : <Ranking />}
    </>
  );
}

export default App;
