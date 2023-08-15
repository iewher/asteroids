import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "../../scss/page-asteroid/page-asteroid.scss";
import { AppRoute } from "../const";
import Header from "../header/header.tsx";
import Footer from "../footer/footer.tsx";
import useFetchData from "../fetch/api.tsx";
import Asteroids from "../asteroids/asteroids.tsx";
import asteroid_large from "../../components/svg/asteroid-large.svg";
import { Link } from "react-router-dom";

interface PageAsteroidsProps {}

const PageAsteroids: React.FC<PageAsteroidsProps> = () => {
  const fetchedAsteroids: object = useFetchData();
  const { id } = useParams();
  const cleanedId = id?.replace(/[^0-9]/g, "");

  console.log(fetchedAsteroids);

  // Ищем астероид с нужным id
  let asteroid = null;
  if (fetchedAsteroids) {
    for (const date in fetchedAsteroids) {
      if (fetchedAsteroids.hasOwnProperty(date)) {
        const asteroidsForDate = fetchedAsteroids[date];
        for (let i = 0; i < asteroidsForDate.length; i++) {
          if (asteroidsForDate[i].id === cleanedId) {
            asteroid = asteroidsForDate[i];
            break;
          }
        }
        if (asteroid) {
          break;
        }
      }
    }
  }

  console.log(asteroid);

  return (
    <>
      <Header />
      <div className="page_asteroid">
        {asteroid ? (
          <div className="container">
            <div className="image">
              <img src={asteroid_large} />
            </div>
            <div className="information">
              <p>Название: {asteroid.name}</p>
              <p>
                Опасен:{" "}
                {asteroid.is_potentially_hazardous_asteroid ? "да" : "нет"}
              </p>
              <p>
                Диаметр астероида:{" "}
                {Math.round(
                  asteroid.estimated_diameter.meters.estimated_diameter_max
                )}{" "}
                (в метрах)
              </p>
              <p>Магнитуда: {asteroid.absolute_magnitude_h}</p>
              <p>
                Скорость:{" "}
                {Math.round(
                  asteroid.close_approach_data[0].relative_velocity
                    .kilometers_per_second
                )}{" "}
                км/с <span>|</span>{" "}
                {Math.round(
                  asteroid.close_approach_data[0].relative_velocity
                    .kilometers_per_hour
                )}{" "}
                км/ч
              </p>
              <p>Орбита: {asteroid.close_approach_data[0].orbiting_body}</p>
              <p>
                Расстояние до астероида:{" "}
                {Math.round(
                  asteroid.close_approach_data[0].miss_distance.kilometers
                )}{" "}
                (в километрах)
              </p>
              <p>
                Расстояние до астероида:{" "}
                {Math.round(
                  asteroid.close_approach_data[0].miss_distance.lunar
                )}{" "}
                (в лунных орбитах)
              </p>
              <div className="button">
                <Link to={AppRoute.ROOT}>
                  <button>Вернуться назд</button>
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <p>Астероид с id {cleanedId} не найден</p>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PageAsteroids;
