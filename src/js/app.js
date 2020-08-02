import Weather from "./models/Weather";
import * as weatherView from "./views/weatherView";
import { elements } from "./base";

// weather object
const weather = {};

const weatherData = async (refresh = false) => {
  weather.data = new Weather();
  try {
    // 1. clear data (if applicable; for refresh) and run the skeleton loader
    if (refresh === true) {
    }
    elements.boxes.forEach((cur) => {
      cur.classList.add("skeleton-loader");
    });

    // 2. retrieve the data from the getWeather() function
    await weather.data.getWeather();
    weather.data.displayWeather();

    setTimeout(() => {
      // 4. display the current weather data
      // display the current time and date (CURRENT DAY SUMMARY)
      weatherView.displayDate();

      weatherView.displayCurrentWeather(weather.data.weather.currentWeather);

      // 5. display the hourly forecast data
      weatherView.displayHourlyWeather(weather.data.weather.hourlyWeather);

      // 6. display the 7 day forecast data
      weatherView.displayDailyWeather(weather.data.weather.dailyWeather);

      // 7. remove skeleton loader
      elements.boxes.forEach((cur) => {
        cur.classList.add("fade-out-content");
      });

      setTimeout(() => {
        elements.boxes.forEach((cur) => {
          cur.classList.remove("skeleton-loader");
          cur.classList.remove("fade-out-content");
          cur.classList.add("fade-in-content");
        });
      }, 2000);
    }, 1500);
  } catch (error) {
    console.log(error);
  }
};

elements.refreshIcon.addEventListener("click", () => {
  // initiate a animation showing the data is being reloaded
  // remove the current weather data
  weatherData();
});

weatherData();
