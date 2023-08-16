import React from "react";
import "../../scss/page-send/page-send.scss";
import { useLocation } from "react-router-dom";

import Header from "../header/header.tsx";
import Footer from "../footer/footer.tsx";

import { Link } from "react-router-dom";
import { AiFillWarning } from "react-icons/ai";

import asteroid_large from "../svg/asteroid-large.svg";
import asteroid_small from "../svg/asteroid-small.svg";
import arrow from "../svg/arrow.svg";
import planet from "../svg/planet.svg";

import useFetchData from "../fetch/api.tsx";

import { AppRoute } from "../const";

interface SendPageProps {
  asteroidId: number;
}

const SendPage: React.FC<SendPageProps> = () => {
  const fetchedAsteroids: object = useFetchData();
  const location = useLocation();
  const asteroidId = location.state?.asteroidId;
  const active = location.state?.active;

  // console.log(active);

  // console.log(asteroidId);

  let asteroids = [];

  if (fetchedAsteroids && asteroidId) {
    for (const date in fetchedAsteroids) {
      if (fetchedAsteroids.hasOwnProperty(date)) {
        const asteroidsForDate = fetchedAsteroids[date];
        for (let i = 0; i < asteroidsForDate.length; i++) {
          if (asteroidId.includes(asteroidsForDate[i].id)) {
            asteroids.push(asteroidsForDate[i]);
          }
        }
      }
    }
  }

  return (
    <>
      <Header />
      <div className="send">
        <img src={planet} alt="Planet" className="planet" />
        <h1>Заказ отправлен!</h1>
        {asteroids.map((asteroid: any, index: number) => (
          <div className="send-container">
            <div className="send-container__distance">
              <p>
                {active
                  ? Math.round(
                      asteroid.close_approach_data[0].miss_distance.lunar
                    )
                  : Math.round(
                      asteroid.close_approach_data[0].miss_distance.kilometers
                    )}{" "}
                {active ? "лунных орбит" : "км"}
              </p>
              <img src={arrow} alt="Arrow" />
            </div>
            <div className="send-container__image">
              {Math.round(
                asteroid.close_approach_data[0].miss_distance.kilometers
              ) > 25000000 ? (
                <img src={asteroid_large} alt="Asteroid" />
              ) : (
                <img src={asteroid_small} alt="Asteroid" />
              )}
            </div>
            <div className="send-container__name">
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
            <div className="send-container__button_and_warning">
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
      <Footer />
    </>
  );
};

export default SendPage;
