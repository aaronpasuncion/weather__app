import { elements } from "./../base";

// get today's date
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

////////////////////////////////////
// CURRENT WEATHER
export const displayDate = () => {
  // display the today's date
  elements.currentDate.textContent = getTodayDate();

  // // display the current time
  elements.currentTime.textContent = getTime();
};

export const displayCurrentWeather = (currentWeather) => {
  console.log(currentWeather);
  // // display the current weather UI
  elements.currentTemp.innerHTML = `${Math.ceil(currentWeather.temp)}&deg;`;
  elements.currentWeather.textContent = currentWeather.weather[0].main;

  // // current weather stats
  elements.curFeelsLike.innerHTML = `${Math.ceil(
    currentWeather.feels_like
  )}&deg;`;
  elements.curHumidity.textContent = `${currentWeather.humidity}`;
  elements.curWinds.textContent = `${currentWeather.wind_speed}`;

  // // currrent weather icon
  elements.currentDayIcon.src = `./img/weather-icons/${currentWeather.weather[0].icon}.svg`;
};

// ////////////////////////////////////
// // HOURLY WEATHER
export const displayHourlyWeather = (hourlyWeather) => {
  // convert the hourlyWeather nodelist to an array
  const hourlyWeatherArr = Array.from(elements.hourForecast);

  // loop through each array item to display the hourly data
  hourlyWeatherArr.forEach((cur, index) => {
    // hour
    cur.children[0].textContent = `${calculateHourly(hourlyWeather[index].dt)}`;
    // weather icon
    cur.children[1].children[0].src = `./img/weather-icons/${hourlyWeather[index].weather[0].icon}.svg`;
    // temp
    cur.children[2].innerHTML = `${Math.round(hourlyWeather[index].temp)}&deg;`;
  });
};

// ////////////////////////////////////
// // DAILY WEATHER

export const displayDailyWeather = (dailyWeather) => {
  // convert to dailyWeatherBox nodelist to array
  const dailyWeatherBoxArr = Array.from(elements.dailyWeatherBox);

  dailyWeatherBoxArr.forEach((cur, index) => {
    cur.children[0].children[0].src = `./img/weather-icons/${dailyWeather[index].weather[0].icon}.svg`;
    cur.children[1].innerHTML = `${Math.round(
      dailyWeather[index].temp.day
    )}&deg;`;
    cur.children[2].textContent = `${convertToDay(dailyWeather[index].dt)}`;
  });
};
