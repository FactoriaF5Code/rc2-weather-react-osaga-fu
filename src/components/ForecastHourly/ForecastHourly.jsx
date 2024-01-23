/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import "./ForecastHourly.css";
import axios from "axios";

const API_FORECAST = `http://api.openweathermap.org/data/2.5/forecast?`;
const API_KEY = "c5a48b3e59d242aedae7b2fb0b9ad0e4";
const ICON_ENDPOINT =
  "https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/";

const iconPaths = {
  "01d": ICON_ENDPOINT + "day.svg",
  "01n": ICON_ENDPOINT + "night.svg",
  "02d": ICON_ENDPOINT + "cloudy-day-1.svg",
  "02n": ICON_ENDPOINT + "cloudy-night-1.svg",
  "03d": ICON_ENDPOINT + "cloudy-day-3.svg",
  "03n": ICON_ENDPOINT + "cloudy-night-3.svg",
  "04d": ICON_ENDPOINT + "cloudy.svg",
  "04n": ICON_ENDPOINT + "cloudy.svg",
  "09d": ICON_ENDPOINT + "rainy-6.svg",
  "09n": ICON_ENDPOINT + "rainy-6.svg",
  "10d": ICON_ENDPOINT + "rainy-4.svg",
  "10n": ICON_ENDPOINT + "rainy-4.svg",
  "11d": ICON_ENDPOINT + "thunder.svg",
  "11n": ICON_ENDPOINT + "thunder.svg",
  "13d": ICON_ENDPOINT + "snowy-6.svg",
  "13n": ICON_ENDPOINT + "snowy-6.svg",
};

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
