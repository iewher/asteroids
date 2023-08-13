import React, { useState, useEffect } from "react";
import "../../scss/main/main.scss";

import Asteroids from "../asteroids/asteroids";

export default function Main() {
  const [active, setActive] = useState(false);
  const [basketValue, setBasketValue] = useState(0)

  const handleSetActive = (value) => {
    if (value !== active) {
      setActive(value);
    }
  };

  // console.log(active);

  return (
    <div className="main">
      <div className="container">
        <div className="container__asteroids">
          <h1>Ближайшие подлёты астероидов</h1>
          <div className="choice">
            <p
              className={!active ? "active" : ""}
              onClick={() => handleSetActive(false)}
            >
              в киллометрах
            </p>
            <span>|</span>
            <p
              className={active ? "active" : ""}
              onClick={() => handleSetActive(true)}
            >
              в лунных орбитах
            </p>
          </div>
          <Asteroids active={active}/>
        </div>
        <div className="container__basket">
          <div className="container__basket-text">
            <h1>Корзина</h1>
            <p>{basketValue} астероидов</p>
          </div>
          <div className="container__basket-button">
            <button>Отправить</button>
          </div>
        </div>
      </div>
    </div>
  );
}
