import "./WeatherApp.css";
import "./animatedIcons.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";

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
          <h3 className="location-name">{data.name}</h3>
          <span>
            <h1 className="location-temp">{data.main.temp.toFixed(1)}</h1>
            <h4>°</h4>
          </span>
          <h4 className="location-weather-state">
            {data.weather[0].description}
          </h4>
          <span className="temp-max-min">
            <h5>Máx: {data.main.temp_max.toFixed(1)}°</h5>
            <h5>Mín: {data.main.temp_min.toFixed(1)}°</h5>
          </span>
          <img
            src="https://www.amcharts.com/wp-content/themes/amcharts4/css/img/icons/weather/animated/cloudy.svg"
            alt=""
          />
        </article>
      )}
    </main>
  );
}
