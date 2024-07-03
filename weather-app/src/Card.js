import { useState, useEffect } from "react";
import "./Card.css";
import humidity from "./images/water-svgrepo-com.svg";
import wind from "./images/wind-svgrepo-com.svg";
import search from "./images/search-alt-2-svgrepo-com.svg";
import loading from "./images/loading-svgrepo-com.svg";

const apiKey = "5114f8d0296304dcaf3d6fbc0c535856";

function Card() {
  const [data, setData] = useState({
    celsius: "11",
    name: "Quito",
    humidity: "83",
    speed: "1.25",
    icon: "04n",
  });
  const [city, setCity] = useState("Quito");

  const fetchWeather = (city) => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        setData({
          celsius: data.main.temp,
          name: data.name,
          humidity: data.main.humidity,
          speed: data.wind.speed,
          icon: data.weather[0].icon,
        });
      })
      .catch((error) => {
        console.error("Error fetching weather data:", error);
      });
  };

  /* 
  Actualiza los valores en tiempo real, sin necesidad de hacer click en el boton
  Analizar bien
  useEffect(() => {
    fetchWeather(city);
  }, [city]);
    */
  const handleCityChange = (e) => {
    setCity(e.target.value);
  };

  const handleSearchClick = () => {
    fetchWeather(city);
  };

  const iconUrl = `https://openweathermap.org/img/wn/${data.icon}@4x.png`;

  return (
    <article className="flex flex-col gap-2 bg-white rounded-lg p-12 text-black ">
      <header className="flex justify-between -mb-4">
        <input
          type="text"
          placeholder="Ingrese la Ciudad"
          className="focus:outline-gray-300 py-2 px-4 rounded-md border-2 border-gray-900 mr-6"
          value={city}
          onChange={handleCityChange}
        />
        <button onClick={handleSearchClick}>
          <img
            src={search}
            className="max-h-6"
            alt="Logo svg del boton de busqueda"
          />
        </button>
      </header>
      <div className="flex flex-col items-center">
        <img src= {iconUrl} className="w-48 -mb-6"/>
        <h2 className="font-medium text-4xl mb-2">{data.name}</h2>
        <h1 className="font-light text-3xl mb-3">{Math.round(data.celsius)}°C</h1>
      </div>
      <div className="flex justify-between">
        <div className="flex items-center">
          <img src={humidity} className="max-w-8 mr-2" alt="humidity icon" />
          <div>
            <h3 className="font-semibold">Humedad</h3>
            <h3>{data.humidity}%</h3>
          </div>
        </div>
        <div className="flex items-center">
          <img src={wind} className="max-w-9 mr-2" alt="wind icon" />
          <div>
            <h3 className="font-semibold">Viento</h3>
            <h3>{Math.round(data.speed * 10)/ 10} m/s</h3>
          </div>
        </div>
      </div>
    </article>
  );
}

export default Card;
