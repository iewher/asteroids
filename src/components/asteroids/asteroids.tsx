import React, { useState, useEffect, createContext } from "react";
import "../../scss/asteroids/asteroids.scss";

import { AiFillWarning } from "react-icons/ai";
import asteroid_large from "../svg/asteroid-large.svg";
import asteroid_small from "../../components/svg/asteroid-small.svg";
import arrow from "../svg/arrow.svg";

import { Link } from "react-router-dom";
import { AppRoute } from "../const";
import useFetchData from "../fetch/api.tsx";

interface AsteroidProps {
  active: boolean;
  onCartValueChange: (value: number, asteroidIds: number[]) => void;
}

const Asteroids: React.FC<AsteroidProps> = ({ active, onCartValueChange }) => {
  const [asteroidState, setAsteroidState] = useState<boolean[]>([]);
  const [cartValue, setCartValue] = useState<number>(0);
  const [asteroidIds, setAsteroidIds] = useState<number[]>([]);

  const asteroids = useFetchData();

  // const today = new Date().toISOString().split("T")[0];

  // console.log(active);

  // console.log(today);

  const handleButtonClick = (date: string, index: number) => {
    const newAsteroidState = [...asteroidState];
    newAsteroidState[index] = !newAsteroidState[index];
    setAsteroidState(newAsteroidState);

    const asteroidId = asteroids[date][index].id;

    const updatedAsteroidIds = newAsteroidState.reduce(
      (ids, isAdded, currentIndex) => {
        if (isAdded) {
          ids.push(asteroids[date][currentIndex].id);
        }
        return ids;
      },
      [] as number[]
    );

    setAsteroidIds(updatedAsteroidIds);

    // Используем updatedAsteroidIds для вычисления updatedCartValue
    const updatedCartValue = updatedAsteroidIds.length;

    onCartValueChange(updatedCartValue, updatedAsteroidIds);
  };

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
                  <Link to={AppRoute.ASTEROID_PAGE + asteroid.id}>
                    <p className="name">{asteroid.name}</p>
                  </Link>
                  <p className="diameter">
                    &#x2300;{" "}
                    {Math.round(
                      asteroid.estimated_diameter.meters.estimated_diameter_max
                    )}{" "}
                    м
                  </p>
                </div>
                <div className="asteroid__button_and_warning">
                  <button onClick={() => handleButtonClick(date, index)}>
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
};

export default Asteroids;
