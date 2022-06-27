import React, { useState } from "react";
import axios from "axios";

export default function SearchEngine(props) {
  const [city, setCity] = useState(null);
  const [forecast, setForecast] = useState("");

  function handleResponse(response) {
    setForecast({
      temperature: response.data.main.temp,
      description: response.data.weather[0].description,
      humidity: response.data.main.humidity,
      wind: response.data.wind.speed,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    });
  }

  function handleSubmit(event) {
    event.preventDefault();

    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3ae01ef987c05906e606566faf8b5655&units=metric`;
    axios.get(apiUrl).then(handleResponse);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <div className="SearchEngine">
      <form onSubmit={handleSubmit}>
        <input type="search" placeholder="Enter a city" onChange={updateCity} />
        <input type="submit" value="Search" />
      </form>
    </div>
  );

  if (forecast) {
    return (
      <div>
        {form}
        <ul>
          <li>Temperature: {Math.round(forecast.temperature)}°C</li>
          <li>Description: {forecast.description}</li>
          <li>Humidity: {forecast.humidity}%</li>
          <li>Wind: {forecast.wind}m/s</li>
          <li>
            <img src={forecast.icon} alt={forecast.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return <div>{form}</div>;
  }
}