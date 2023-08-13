import React, { useState, useEffect } from "react";
import "../../scss/main/main.scss";

import Asteroids from "../asteroids/asteroids";

export default function Main() {
  const [active, setActive] = useState(false);
  const [cartValue, setCartValue] = useState(0);

  const handleSetActive = (value) => {
    if (value !== active) {
      setActive(value);
    }
  };

  const handleCartValueChange = (value) => {
    setCartValue(value);
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
          <Asteroids
            active={active}
            onCartValueChange={handleCartValueChange}
          />
        </div>
        <div className="container__cart">
          <div className="container__cart-text">
            <h1>Корзина</h1>
            <p>{cartValue} астероидов</p>
          </div>
          <div className="container__cart-button">
            <button>Отправить</button>
          </div>
        </div>
      </div>
    </div>
  );
}
