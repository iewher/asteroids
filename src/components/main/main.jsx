import React, { useState, useEffect } from "react";
import "../../scss/main/main.scss";

import Asteroids from "../asteroids/asteroids";

export default function Main() {
  const [count, setCount] = useState(0);

  return (
    <div className="main">
      <div className="container">
        <div className="container__asteroids">
          <h1>Ближайшие подлёты астероидов</h1>
          <p>в киллометрах | в лунных орбитах</p>
          <Asteroids />
          <Asteroids />
          <Asteroids />
          <Asteroids />
        </div>
        <div className="container__basket">
          <div className="container__basket-text">
            <h1>Корзина</h1>
            <p>2 астероида</p>
          </div>
          <div className="container__basket-button">
            <button>Отправить</button>
          </div>
        </div>
      </div>
    </div>
  );
}
