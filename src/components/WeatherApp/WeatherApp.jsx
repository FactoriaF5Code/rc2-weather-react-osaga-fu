import { useEffect } from "react";
import "./WeatherApp.css";
import { useState } from "react";
import axios from 'axios';

const API_ENDPOINT = "https://api.openweathermap.org/data/3.0/onecall?";
const API_KEY = "c5a48b3e59d242aedae7b2fb0b9ad0e4";



export default function WeatherApp() {

    const [latitude, setLatitude] = useState("");
    const [longitude, setLongitude] = useState("")

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });

    console.log(latitude, longitude);

    // axios.get( `${API_ENDPOINT}lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
    // .then((response) => {
    //     console.log(response.data)
    // });

  }, []);

  return (
    <div>
      <h1>WeatherApp</h1>
    </div>
  );
}
