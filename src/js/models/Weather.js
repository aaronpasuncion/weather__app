import axios from "axios";

export default class Weather {
  constructor() {
    this.weather = {};
  }

  async getWeather() {
    try {
      const data = await axios(
        `https://api.openweathermap.org/data/2.5/onecall?lat=43.700111&lon=-79.416298&exclude=&units=metric&appid=8c9e23c5d02aaf0137f2783f0b9db6c6`
      );

      // set the current weather data
      this.weather.currentWeather = data.data.current;
      // set the hourly weather data
      this.weather.hourlyWeather = [];
      for (let i = 1; i < data.data.hourly.length - 39; i++) {
        this.weather.hourlyWeather.push(data.data.hourly[i]);
      }
      // set the 7 day forecast data
      this.weather.dailyWeather = data.data.daily;
      this.weather.dailyWeather.shift();
    } catch (error) {
      console.log(error);
    }
  }

  displayWeather() {
    console.log(this.weather);
  }
}

// {
//     "id": 6167865,
//     "name": "Toronto",
//     "state": "",
//     "country": "CA",
//     "coord": {
//       "lon": -79.416298,
//       "lat": 43.700111
//     }

/*
7 day forecast
https://api.openweathermap.org/data/2.5/onecall?lat=43.700111&lon=-79.416298&exclude=hourly,minutely&units=metric&appid=8c9e23c5d02aaf0137f2783f0b9db6c6
*/
