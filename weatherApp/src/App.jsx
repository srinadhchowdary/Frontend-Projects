import React from "react";
import "./App.css";

const App = () => {

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");


  const [city, setCity] = React.useState("");
  const [temp, setTemp] = React.useState(null);
  const [displayCity, setDisplayCity] = React.useState("");


  const changeHandler = (e) => {
    setCity(e.target.value);
  };

  const formatCityName = (name) => {
  return name
    .split(" ")
    .map(
      (word) =>
        word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
};

  

  const submitHandler = (e) => {
  e.preventDefault();

    if (!city.trim()) {
      setError("Please enter a city name");
      return;
    }
  setLoading(true);
  setError("");
  setTemp(null);

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d885aa1d783fd13a55050afeef620fcb`
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      const celsius = data.main.temp - 273.15;
      setTemp(celsius.toFixed(1));
      setDisplayCity(formatCityName(data.name));
    })
    .catch((err) => {
      setError(err.message);
      console.log(err);
    })
    .finally(() => {
      setLoading(false);
      setCity("");
    });
};


  return (
    <div className="app">
      <div className="weather-card">
        <h4 className="card-title">Weather App</h4>

        <form className="search-form" onSubmit={submitHandler}>
          <input
            type="text"
            value={city}
            placeholder="Enter city name"
            onChange={changeHandler}
            disabled={loading}
          />
          <button type="submit" disabled={loading}>
            Get Temperature
          </button>
        </form>


        <div className="weather-result">
          {loading && <p className="status-text">Loading...</p>}

          {error && <p className="error-text">{error}</p>}

          {temp && !loading && !error && (
          <>
          <p className="temp-label">Current Temperature</p>
          <h1 className="temperature">{temp}°C</h1>
          <p className="city-name">{displayCity}</p>
          </>
        )}
      </div>


      </div>
    </div>
  );
};

export default App;
