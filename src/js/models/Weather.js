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

  // get today's date
  getTodayDate() {
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let date = new Date();
    let dayOfWeek = date.getDay();
    let month = date.getMonth();
    let day = date.getDate();
    let year = date.getFullYear();
    let todaysDate = `${days[dayOfWeek]}, ${months[month]} ${day}, ${year}`;

    return todaysDate;
  }

  // getTime function that returns the current time
  getTime() {
    let date, minutes, time;
    date = new Date();
    let { hour, timeOfDay } = this.convertHour(date.getHours());
    minutes =
      date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    time = `${hour}:${minutes}${timeOfDay}`;

    return time;
  }

  // convertHour function that converts 24 hour time to 12 hour time when applicable
  convertHour(hour) {
    let newHour, timeOfDay;

    // determine the time of day and convert 24 hour time to 12 hour time
    if (hour >= 12) {
      timeOfDay = `PM`;
      if (hour === 12) {
        newHour = `12`;
      } else {
        newHour = `${hour - 12}`;
      }
    } else if (hour < 12) {
      timeOfDay = `AM`;
      if (hour === 0) {
        newHour = `12`;
      } else {
        newHour = hour;
      }
    }

    return {
      hour: newHour,
      timeOfDay: timeOfDay,
    };
  }

  // convertToDay function that returns the day of the week
  convertToDay(sec) {
    const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
    let date = new Date(sec * 1000);
    let day = date.getDay();

    return days[day];
  }

  calculateHourly(sec) {
    let date = new Date(sec * 1000);
    let { hour, timeOfDay } = this.convertHour(date.getHours());

    return `${hour}${timeOfDay}`;
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
