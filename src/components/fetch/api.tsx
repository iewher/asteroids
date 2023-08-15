import { useState, useEffect } from 'react';

const API_KEY = "5qTNISBUU6vUfgmmK2mE3IWbeT5uc7MStNkjkl56";

interface FetchDataProps {}

const useFetchData: React.FC<FetchDataProps> = () => {
  const [asteroids, setAsteroids] = useState<any | null>(null);

  useEffect(() => {
    fetch(
      `https://api.nasa.gov/neo/rest/v1/feed?start_date=&end_date=&api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        setAsteroids(data.near_earth_objects);
      })
      .catch((error) => {
        console.error(error, "Запрос не сработал");
      });
  }, []);

  return asteroids;
};

export default useFetchData;