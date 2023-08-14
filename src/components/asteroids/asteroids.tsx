import React, { useState, useEffect } from "react";
import "../../scss/asteroids/asteroids.scss";

import { AiFillWarning } from "react-icons/ai";
import asteroid_large from "../svg/asteroid-large.svg";
import asteroid_small from "../../components/svg/asteroid-small.svg";
import arrow from "../svg/arrow.svg";

interface AsteroidProps {
  active: boolean;
  onCartValueChange: (value: number) => void;
}

const Asteroids:React.FC<AsteroidProps> = ({ active, onCartValueChange }) => {
  const [asteroids, setAsteroids] = useState<any | null>(null);
  const [asteroidState, setAsteroidState] = useState<boolean[]>([]);
  const [cartValue, setCartValue] = useState<number>(0);

  // const today = new Date().toISOString().split("T")[0];
  const API_KEY = "5qTNISBUU6vUfgmmK2mE3IWbeT5uc7MStNkjkl56";

  // console.log(active);

  // console.log(today);

  const handleButtonClick = (index: number) => {
    const newAsteroidState = [...asteroidState];
    newAsteroidState[index] = !newAsteroidState[index];
    setAsteroidState(newAsteroidState);

    const handleCartChange = () => {
      if (newAsteroidState[index]) {
        setCartValue(cartValue + 1);
      } else {
        setCartValue(cartValue - 1);
      }
    };

    const updatedCartValue = newAsteroidState.reduce(
      (total, isAdded) => total + (isAdded ? 1 : 0),
      0
    );

    handleCartChange();
    onCartValueChange(updatedCartValue);
  };

  // console.log(basketValue);

  const fetchData = () => {
    fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=&end_date=&api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data.near_earth_objects);
        setAsteroids(data.near_earth_objects);
      })
      .catch((error) => {
        console.error(error, "Запрос не сработал");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // console.log(asteroids);

  return (
    <>
      {asteroids &&
        Object.keys(asteroids).map((date) => (
          <div>
            {asteroids[date].map((asteroid: any, index: number) => (
              <div className="asteroid">
                <h1 className="asteroid__date">{date}</h1>
                <div className="asteroid__distance">
                  <p>
                    {active
                      ? Math.round(
                          asteroid.close_approach_data[0].miss_distance.lunar
                        )
                      : Math.round(
                          asteroid.close_approach_data[0].miss_distance
                            .kilometers
                        )}{" "}
                    {active ? "лунных орбит" : "км"}
                  </p>
                  <img src={arrow} alt="Arrow" />
                </div>
                <div className="asteroid__image">
                  {Math.round(
                    asteroid.close_approach_data[0].miss_distance.kilometers
                  ) > 25000000 ? (
                    <img src={asteroid_large} alt="Asteroid" />
                  ) : (
                    <img src={asteroid_small} alt="Asteroid" />
                  )}
                </div>
                <div className="asteroid__name">
                  <p className="name">{asteroid.name}</p>
                  <p className="diameter">
                    &#x2300;{" "}
                    {Math.round(
                      asteroid.estimated_diameter.meters.estimated_diameter_max
                    )}{" "}
                    м
                  </p>
                </div>
                <div className="asteroid__button_and_warning">
                  <button onClick={() => handleButtonClick(index)}>
                    {asteroidState[index] ? "в корзине" : "заказать"}
                  </button>
                  <div className="warning">
                    <AiFillWarning
                      className={
                        asteroid.is_potentially_hazardous_asteroid
                          ? "icon-active"
                          : "icon-disable"
                      }
                    />
                    <p>
                      {asteroid.is_potentially_hazardous_asteroid
                        ? "Опасен"
                        : "Не опасен"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
    </>
  );
}

export default Asteroids;
