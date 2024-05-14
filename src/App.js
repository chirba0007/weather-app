import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [longitude, setLongitude] = useState(-17.4441);
  const [latitude, setLatitude] = useState(14.6937);
  const [city, setCity] = useState("");
  const [temp, setTemp] = useState("");
  const [main, setMain] = useState("");
  const [desc, setDesc] = useState("");
  const [icon, setIcon] = useState("");
  const [sunrise, setSunrise] = useState("");
  const [sunset, setSunset] = useState("");
  const [isReady, setReady] = useState(false);

  useEffect(() => {
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=b6a7bf87cb4d1b24d1728e993ef10db5&units=metric`
    )
      .then((result) => result.json())
      .then((jsonresult) => {
        setCity(jsonresult.name);
        setTemp(jsonresult.main.temp);
        setMain(jsonresult.weather[0].main);
        setDesc(jsonresult.weather[0].description);
        setIcon(jsonresult.weather[0].icon);
        setSunrise(new Date(jsonresult.sys.sunrise * 1000).toLocaleTimeString());
        setSunset(new Date(jsonresult.sys.sunset * 1000).toLocaleTimeString());
        setReady(true);
      })
      .catch((err) => console.error(err));
  }, [latitude, longitude]);

  return (
    <div
      className="App"
      style={{
        backgroundImage: "url('https://source.unsplash.com/1600x900/?weather')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        height: "100vh",
      }}
    >
      <h1>My Weather App</h1>
      <div className="input-container">
        <label htmlFor="longitude">Longitude :</label>
        <input
          type="text"
          id="longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
        />
        <label htmlFor="latitude">Latitude :</label>
        <input
          type="text"
          id="latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
        />
      </div>
      {isReady ? (
        <div className="weather-info" style={{ backgroundColor: temp > 20 ? "#ffcc80" : "#80d8ff" }}>
          <h2>City: {city}</h2>
          <div className="temperature-info">
            <p>Temperature: {temp} °C</p>
            <p>Main: {main}</p>
            <p>Description: {desc}</p>
            <p>Sunrise: {sunrise}</p>
            <p>Sunset: {sunset}</p>
            <img
              src={`http://openweathermap.org/img/wn/${icon}.png`}
              alt="Weather icon"
            />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default App;
