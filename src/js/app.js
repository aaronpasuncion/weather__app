import axios from "axios";
import { elements } from "./base";

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

const getTodayDate = () => {
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
};

// getTime function that returns the current time
const getTime = () => {
  let date, minutes, time;
  date = new Date();
  console.log(date.getMinutes());
  let { hour, timeOfDay } = convertHour(date.getHours());
  minutes =
    date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
  time = `${hour}:${minutes}${timeOfDay}`;

  return time;
};

// convertHour function that converts 24 hour time to 12 hour time when applicable
const convertHour = (hour) => {
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
};

// convertToDay function that returns the day of the week
const convertToDay = (sec) => {
  const days = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  let date = new Date(sec * 1000);
  let day = date.getDay();

  return days[day];
};

const calculateHourly = (sec) => {
  let date = new Date(sec * 1000);
  let { hour, timeOfDay } = convertHour(date.getHours());

  return `${hour}${timeOfDay}`;
};

const weather = {};

async function getWeather() {
  try {
    const data = await axios(
      `https://api.openweathermap.org/data/2.5/onecall?lat=43.700111&lon=-79.416298&exclude=&units=metric&appid=8c9e23c5d02aaf0137f2783f0b9db6c6`
    );

    // set the current weather data
    weather.currentWeather = data.data.current;
    // set the hourly weather data
    weather.hourlyWeather = [];
    for (let i = 1; i < data.data.hourly.length - 39; i++) {
      weather.hourlyWeather.push(data.data.hourly[i]);
    }
    // set the 7 day forecast data
    weather.dailyWeather = data.data.daily;
    weather.dailyWeather.shift();

    ////////////////////////////////////
    // CURRENT WEATHER
    console.log(weather);

    // display the today's date
    elements.currentDate.textContent = getTodayDate();

    // display the current time
    elements.currentTime.textContent = getTime();

    // display the current weather UI
    elements.currentTemp.innerHTML = `${Math.ceil(
      weather.currentWeather.temp
    )}&deg;`;
    elements.currentWeather.textContent =
      weather.currentWeather.weather[0].main;

    // current weather stats
    elements.curFeelsLike.innerHTML = `${Math.ceil(
      weather.currentWeather.feels_like
    )}&deg;`;
    elements.curHumidity.textContent = `${weather.currentWeather.humidity}`;
    elements.curWinds.textContent = `${weather.currentWeather.wind_speed}`;

    // currrent weather icon
    let curHtml = `
    <img src="./img/weather-icons/${weather.currentWeather.weather[0].icon}.svg" class="current-day__icon icon" alt="${weather.currentWeather.weather[0].description}">
    `;

    elements.currentIcon.insertAdjacentHTML("beforeend", curHtml);

    ////////////////////////////////////
    // HOURLY WEATHER
    for (let hour of weather.hourlyWeather) {
      let html = `
       <div class="current-day__hourly-forecast">
          <p class="current-day__hour-time text text--tertiary">${calculateHourly(
            hour.dt
          )}</p>
          <div class="current-day__hour-icon">
            <img src="./img/weather-icons/${
              hour.weather[0].icon
            }.svg" class="current-day__hour-icon icon" alt="${
        hour.weather[0].description
      }">
          </div>
          <p class="current-day__hour-temp text text--tertiary">
            ${Math.round(hour.temp)}&deg;
          </p>
        </div>
      `;

      elements.hourlyForecastContainer.insertAdjacentHTML("beforeend", html);
    }

    ////////////////////////////////////
    // DAILY WEATHER
    for (let day of weather.dailyWeather) {
      let html = `
        <div class="upcoming-weather__forecast">
          <div class="upcoming-weather__day">
            <div class="upcoming-weather__icon">
              <img src="./img/weather-icons/${
                day.weather[0].icon
              }.svg" class="upcoming-weather__icon icon" alt="${
        day.weather[0].description
      }">
            </div>
            <h4 class="heading-quatenary upcoming-weather__temp">
              ${Math.round(day.temp.day)}&deg;
            </h4>
            <p class="text text--secondary">${convertToDay(day.dt)}</p>
          </div>
        </div>
      
      `;
      elements.upcomingWeatherContainer.insertAdjacentHTML("beforeend", html);
    }
  } catch (error) {
    console.log(error);
  }
}

getWeather();

/**
 
1. GET DATA FROM API
2. SPLIT UP DATA FOR CURRENT, HOURLY, DAILY WEATHER
3. RUN LOOPS FOR THE HOURLEY AND DAILY WEATHER TO INJECT HTML INTO THEIR CONTAINERS

 */
