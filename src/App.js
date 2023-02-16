import './App.css';
import Search from './component/search/search';
import CurrentWeather from './component/current-weather/current-weather';
import { WEATHER_API_URL, WEATHER_API_KEY } from './api';
import { useState } from 'react';
import ForeCast from './component/forecast/forecast';
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme, GlobalStyles } from "./themes.js"
function App() {
  const [theme, setTheme] = useState("light");
  const [currentWeather, setcurrentWeather] = useState(null);
  const [forecast, setForeCast] = useState(null);
  const [unit, setUnit] = useState("C");
  const oppositeUnit = unit === "C" ? "F" : "C";
  
  const themeToggler = () =>{
    theme === "light" ? setTheme("dark"):setTheme("light");
  };
  const convert = () => {
    themeToggler();
    setUnit(oppositeUnit);
};
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");

    const currentWeatherFetch = fetch(`${WEATHER_API_URL}current.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&aqi=yes`);

    const forecastFetch = fetch(`${WEATHER_API_URL}forecast.json?key=${WEATHER_API_KEY}&q=${lat},${lon}&days=11&aqi=yes`);

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forecastResponse = await response[1].json();

        setcurrentWeather({ city: searchData.label, ...weatherResponse });
        setForeCast({ city: searchData.label, ...forecastResponse });

      })
      .catch((err) => {
        return (
          <div class="error">
            <p>
              <h1>Kindly Try again! by searching a valid city(The App couldn't get city) or try again later.</h1>
            </p>
          </div>
        );
      });
  }

  console.log(currentWeather);
  console.log(forecast);

  return (
    <ThemeProvider theme={theme==='light'?lightTheme:darkTheme}>
      <GlobalStyles />
      <div className="container">
      <p>
        Temperature in {unit}
      </p>
      <button id="toggle" onClick={convert}>Convert to {oppositeUnit}</button><br/>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} Unit={unit}/>}
      {forecast &&<ForeCast data={forecast} Unit={unit}/>}
    </div>
    </ThemeProvider>
    
  );
}

export default App;
