export const elements = {
  // current weather
  currentDate: document.querySelector(".current-day__date"),
  currentTemp: document.querySelector(".current-day__cur-temp"),
  currentWeather: document.querySelector(".current-day__desc"),
  currentDayIcon: document.querySelector(".current-day__icon"),
  currentTime: document.querySelector(".current-day__time"),
  // current stats
  curFeelsLike: document.querySelector(".current-day__feels-like--val"),
  curHumidity: document.querySelector(".current-day__humidity--val"),
  curWinds: document.querySelector(".current-day__winds--val"),
  // hourly weather
  hourlyForecastContainer: document.querySelector(".current-day__hourly"),
  hourForecast: document.querySelectorAll(".current-day__hourly-forecast"),

  // 7 day forecast
  upcomingWeatherContainer: document.querySelector(
    ".upcoming-weather__container"
  ),
  dailyWeatherBox: document.querySelectorAll(".upcoming-weather__box"),
  // data refresh
  refreshIcon: document.querySelector(".data-refresh"),
  // boxes
  boxes: Array.from(document.querySelectorAll(".box")),
};
