import "./WeatherApp.css";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import ForecastHourly from "../ForecastHourly/ForecastHourly";
import { iconPaths } from "../../utils/IconPath/IconPath";

const API_ENDPOINT = "https://api.openweathermap.org/data/2.5/weather?";
const API_KEY = "c5a48b3e59d242aedae7b2fb0b9ad0e4";

export default function WeatherApp() {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [pulsado, setPulsado] = useState(false);

  

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

  const searchLocation = async (event) => {
    if (event.key === "Enter") {
      const response = await axios.get(
        `${API_ENDPOINT}q=${location}&appid=${API_KEY}&units=metric&lang=es`
      );
      setData(response.data);
      setPulsado(true);
    }
  };

  return (
    <main>
      {data.main && (
        <div className="cards-container">
          <article className="current-weather-card">
            <h3 className="location-name">{data.name}</h3>
            <span>
              <h1 className="location-temp">{data.main.temp.toFixed(1)}</h1>
              <p className="degree-symbol">°</p>
            </span>
            <h4 className="location-weather-state">
              {data.weather[0].description}
            </h4>
            <span className="temp-max-min">
              <h5>Máx: {data.main.temp_max.toFixed(1)}°</h5>
              <h5>Mín: {data.main.temp_min.toFixed(1)}°</h5>
            </span>
            <img
              className="animated-weather-icon"
              src={iconPaths[data.weather[0].icon]}
              alt=""
            />
            <input
              className="search-input"
              type="text"
              placeholder="Buscar por ciudad"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              onKeyDown={searchLocation}
            />
          </article>
          <ForecastHourly
            latitude={latitude}
            longitude={longitude}
            location={location}
            pulsado={pulsado}
            data={data}
          />
        </div>
      )}
    </main>
  );
}
