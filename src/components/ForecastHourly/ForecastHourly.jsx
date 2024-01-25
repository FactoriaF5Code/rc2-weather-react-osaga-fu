/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./ForecastHourly.css";
import axios from "axios";
import { iconPaths } from "../../utils/IconPath/IconPaths";
import { API_KEY, API_FORECAST } from "../../utils/API/APIpaths";

export default function ForecastHourly({
  latitude,
  longitude,
  location,
  pulsado,
  data,
}) {
  const [forecastHourly, setForecastHourly] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (latitude !== "" && longitude !== "" && location === "") {
          const response = await axios.get(
            `${API_FORECAST}lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=es&cnt=5`
          );
          setForecastHourly(response.data);
        } else if (pulsado) {
          const response = await axios.get(
            `${API_FORECAST}q=${location}&cnt=5&lang=es&units=metric&appid=${API_KEY}`
          );
          setForecastHourly(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [latitude, longitude, data]);

  return (
    <section className="hourly-forecast">
      <h1 className="hourly-forecast-title">PREDICCIÓN POR HORAS</h1>
      <div className="hourly-cards-container">
        {forecastHourly.list &&
          forecastHourly.list.map((hora) => (
            <article className="hourly-forecast-card" key={hora.dt}>
              <h4 className="forecast-card-time">
                {new Date(hora.dt * 1000).getHours() - 1}h
              </h4>
              <img
                className="forecast-weather-icon"
                src={iconPaths[hora.weather[0].icon]}
                alt="no hay icono"
              />
              <h3 className="forecast-card-temp">
                {hora.main.temp.toFixed(1)}°
              </h3>
            </article>
          ))}
      </div>
    </section>
  );
}
