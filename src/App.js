import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

const PLACES = [
  {name: "Perm", zip: "614000"},
  {name: "Moscow", zip: "101000"},
  {name: "Melbourne", zip: "32919"},
  {name: "San Francisco", zip: "94102"}
];
class WeatherDisplay extends Component {
  constructor() {
    super();
    this.state = {
      weatherData: null
    };
  }
  componentDidMount() {
    const zip = this.props.zip;
    const URL = "http://api.openweathermap.org/data/2.5/weather?q=" 
      + zip + "&appid=b1b35bba8b434a28a0be2a3e1071ae5b&units=imperial";
    fetch(URL).then(res => res.json()).then(json => {
      this.setState({weatherData: json});
    });
  }
  render() {
    const weatherData = this.state.weatherData;
    if (!weatherData) return <h3>Loading...</h3>;
    const weather = weatherData.weather[0];
    const iconUrl = "http://openweathermap.org/img/w/" + weather.icon + ".png";
    return (
      <div>
        <h1>
          {weather.main} in {weatherData.name}
          <img src = {iconUrl} alt = {weatherData.description} />
        </h1>
        <p>Current: {weatherData.main.temp}°F</p>
        <p>High: {weatherData.main.temp_max}°F</p>
        <p>Low: {weatherData.main.temp_min}°F</p>
        <p>Wind Speed: {weatherData.main.speed} mi/hr</p>
      </div>
    );
  }
}
class App extends Component {
  constructor() {
    super();
    this.state = {
      activePlace: 0
    };
  }
  render() {
    const activePlace = this.state.activePlace;
    return (
      <div className = "App">
        {PLACES.map((place, index) => (
          <button
            key = {index}
            onClick = { () => {
              this.setState({activePlace: index});
            }}
          >
              {place.name}
          </button>
        ))}
        <WeatherDisplay key = {activePlace} zip = {PLACES[activePlace].zip} />
      </div>
    );
  }
}

export default App;
