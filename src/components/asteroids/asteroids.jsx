import React, { useEffect } from "react";
import "../../scss/asteroids/asteroids.scss";

import { AiFillWarning } from "react-icons/ai";
import asteroid_large from "../svg/asteroid-large.svg";
import arrow from "../svg/arrow.svg";

export default function Asteroids() {
  const today = new Date().toISOString().split("T")[0];
  const API_KEY = "5qTNISBUU6vUfgmmK2mE3IWbeT5uc7MStNkjkl56";

  console.log(today);

  const fetchData = () => {
    fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data.near_earth_objects);
        return data.near_earth_objects;
      });
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <div className="asteroid">
      <h1 className="asteroid__date">12 сент 2023</h1>
      <div className="asteroid__distance">
        <p>5 652 475 км</p>
        <img src={arrow} />
      </div>
      <div className="asteroid__name">
        <img src={asteroid_large} />
        <p>2021 FQ</p>
      </div>
      <div className="asteroid__button_and_warning">
        <button>заказать</button>
        <div className="warning">
          <AiFillWarning />
          <p>Опасен</p>
        </div>
      </div>
    </div>
  );
}
