import './App.css';
import React, { useState, useEffect } from 'react';
import WeatherDeets from './WeatherDeets';
import ZipChooser from './zipchooser';


export default function App() {
  const [state, setState] = useState({
    zip: '08701'
  });

  useEffect(() => {
    console.log('componentDidMount');
    async function getWeather() {
      const appId = '';
      try {
        const result = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${state.zip}&appid=${appId}&units=imperial&lang=he`)
        const weatherData = await result.json();
        if (!result.ok) {
          throw Error(result.statusText);
        }
        console.log(weatherData);
        setState(s => ({
          ...s,
          city: weatherData.name,
          icon: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
          info: `${weatherData.main.temp} and ${weatherData.weather[0].description}`,
          error: null
        }));
      } catch (e) {
        console.error(e);
        setState(s => ({
          ...s,
          error: e.message,
          city: null,
          icon: '',
          info: ''
        }));
      }
    }

    if (state.zip.length === 5) {
      getWeather();
    }
  }, [state.zip]);

  function zipChanged(e) {
    setState({
      zip: e.target.value
    });
  }



  const weather = state.city ?
    <WeatherDeets city={state.city} icon={state.icon} info={state.info} /> :
    <div>please enter a zip code for weather</div>;
  const error = state.error ?
    <div className="alert alert-danger">{state.error}</div> :
    null;
  return (
    <div className="container text-center">
      <div className="row">
        <ZipChooser zip={state.zip} zipChanged={zipChanged} />
      </div>
      {weather}
      {error}
    </div>
  );
}
