import React, { useState } from 'react';
import './WeatherApp.css';

import search_icon from '../Assets/search.png';
import clear_icon from '../Assets/clear.png';
import cloud_icon from '../Assets/cloud.png';
import drizzle_icon from '../Assets/drizzle.png';
import rain_icon from '../Assets/rain.png';
import snow_icon from '../Assets/snow.png';
import wind_icon from '../Assets/wind.png';
import humidity_icon from '../Assets/humidity.png';

const WeatherApp = () => {
  // API key for OpenWeatherMap
  let api_key = "4503b6681b513b0b6e655a4c57c5c597";

  // State for the weather icon
  const [wicon, setWicon] = useState(cloud_icon);

  // Function to handle the search logic
  const search = async () => {
    // Get the input element
    const element = document.getElementsByClassName("cityInput");
    // Check if the input is empty
    if (element[0].value === "") {
      return 0;
    }

    // Construct the API URL
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;
    
    // Fetch data from the API
    let response = await fetch(url);
    // Parse data into JSON format
    let data = await response.json();

    // Get DOM elements for displaying weather information
    const humidity = document.getElementsByClassName("humidity-percent");
    const wind = document.getElementsByClassName("wind-rate");
    const temperature = document.getElementsByClassName("weather-temp");
    const location = document.getElementsByClassName("weather-location");

    // Display weather information
    humidity[0].innerHTML = data.main?.humidity + " %";
    wind[0].innerHTML = Math.floor(data.wind?.speed) + " km/h";
    temperature[0].innerHTML = Math.floor(data.main?.temp) + "°c";
    location[0].innerHTML = data.name;

    // Update weather icon based on the weather condition code
    if (data.weather && data.weather.length > 0) {
      const weatherIconCode = data.weather[0].icon;

      if (weatherIconCode === "01d" || weatherIconCode === "01n") {
        setWicon(clear_icon);
      } else if (weatherIconCode === "02d" || weatherIconCode === "02n") {
        setWicon(cloud_icon);
      } else if (weatherIconCode === "03d" || weatherIconCode === "03n") {
        setWicon(drizzle_icon);
      } else if (weatherIconCode === "04d" || weatherIconCode === "04n") {
        setWicon(drizzle_icon);
      } else if (weatherIconCode === "09d" || weatherIconCode === "09n") {
        setWicon(rain_icon);
      } else if (weatherIconCode === "10d" || weatherIconCode === "10n") {
        setWicon(rain_icon);
      } else if (weatherIconCode === "13d" || weatherIconCode === "13n") {
        setWicon(snow_icon);
      } else {
        setWicon(clear_icon);
      }
    }
  };

  // Function to handle the "Enter" key press in the input field
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      search();
    }
  };

  return (
    <div className="container">
      <div className="top-bar">
        {/* Input for city search */}
        <input
          type="text"
          className="cityInput"
          placeholder="Search"
          onKeyPress={handleKeyPress}
        />
        {/* Search icon button */}
        <div className="search-icon" onClick={search}>
          <img src={search_icon} alt="" />
        </div>
      </div>
      {/* Weather icon display */}
      <div className="weather-image">
        <img src={wicon} alt="" />
      </div>
      {/* Temperature display */}
      <div className="weather-temp">24°c</div>
      {/* Location display */}
      <div className="weather-location">London</div>
      {/* Additional weather information containers */}
      <div className="data-containers">
        {/* Humidity */}
        <div className="element">
          <img src={humidity_icon} alt="" className="icon" />
          <div className="data">
            <div className="humidity-percent">64%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        {/* Wind Speed */}
        <div className="element">
          <img src={wind_icon} alt="" className="icon" />
          <div className="data">
            <div className="wind-rate">18 km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherApp;
