import './App.css';
import React, { Component } from 'react';
import WeatherDeets from './WeatherDeets';


class App extends Component {

  state = {
    zip: ['08701', '11214', '10001', '10019', '10036', '10010', '10011', '10012', '10013', '10014', '10015', '10016', '10017']
  }
  componentDidMount() {
    console.log('componentDidMount');
    const appId = 'f23ff7c8d7e2adcc37fe093a1af71230';

    fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${this.state.zip[0]}&appid=${appId}&units=imperial&lang=he`)
      .then(r => {
        if (!r.ok) {
          throw new Error(`${r.status} ${r.statusText}`);
        }
        return r.json();
      })
      .then(weatherData => {
        console.log(weatherData);
        this.setState({
          city: weatherData.name,
          icon: `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`,
          info: `${weatherData.main.temp} and ${weatherData.weather[0].description}`
        });
      })
      .catch(e => {
        console.error(e);
      });
  }
  render() {
    return (
      <>
        <WeatherDeets city={this.state.city} icon={this.state.icon} info={this.state.info} />
      </>
    );
  }
}

export default App;
