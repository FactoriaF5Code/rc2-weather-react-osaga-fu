import "./WeatherApp.css";
import "./animatedIcons.css"
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import  Icon from "../../assets/amcharts_weather_icons_1.0.0/animated/cloudy-day-1.svg?react";


const API_ENDPOINT = "https://api.openweathermap.org/data/2.5/weather?";
const API_KEY = "c5a48b3e59d242aedae7b2fb0b9ad0e4";

//https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}

export default function WeatherApp() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    console.log(latitude, longitude);

    if (latitude !== "" && longitude !== "") {
      axios
        .get(
          `${API_ENDPOINT}lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=es`
        )
        .then((response) => {
          setData(response.data);
        });
    }
  }, [latitude, longitude]);

  return (
    <main>
      {data.main && (
        <article className="current-weather-card">
          <h1>{data.name}</h1>
          <h3>{data.main.temp.toFixed(1)}°</h3>
          <h4>{data.weather[0].description}</h4>
          <span className="temp-max-min">
            <h5>Máx: {data.main.temp_max.toFixed(1)}</h5>
            <h5>Mín: {data.main.temp_min.toFixed(1)}</h5>
          </span>
          <Icon />
        </article>
      )}
    </main>
  );
}
