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
      elements.boxes.forEach((cur) => {
        cur.classList.add("fade-out-content");
      });

      setTimeout(() => {
        elements.boxes.forEach((cur) => {
          cur.classList.remove("fade-out-content");
          cur.classList.add("skeleton-loader");
        });
      }, 1000);

      // 2. retrieve the data from the getWeather() function
      await weather.data.getWeather();

      setTimeout(() => {
        // 3. display the current weather data
        weatherView.displayDate();

        weatherView.displayCurrentWeather(weather.data.weather.currentWeather);

        // 4. display the hourly forecast data
        weatherView.displayHourlyWeather(weather.data.weather.hourlyWeather);

        // 5. display the 7 day forecast data
        weatherView.displayDailyWeather(weather.data.weather.dailyWeather);

        // 6. remove skeleton loader
        elements.boxes.forEach((cur) => {
          cur.classList.add("fade-out-content");
        });

        setTimeout(() => {
          elements.boxes.forEach((cur) => {
            cur.classList.remove("skeleton-loader");
            cur.classList.remove("fade-out-content");
            cur.classList.add("fade-in-content");
          });
        }, 1250);
      }, 1250);
    } else {
      elements.boxes.forEach((cur) => {
        cur.classList.add("skeleton-loader");
      });
      // 2. retrieve the data from the getWeather() function
      await weather.data.getWeather();

      setTimeout(() => {
        // 3. display the current weather data
        weatherView.displayDate();

        weatherView.displayCurrentWeather(weather.data.weather.currentWeather);

        // 4. display the hourly forecast data
        weatherView.displayHourlyWeather(weather.data.weather.hourlyWeather);

        // 5. display the 7 day forecast data
        weatherView.displayDailyWeather(weather.data.weather.dailyWeather);

        // 6. remove skeleton loader
        elements.boxes.forEach((cur) => {
          cur.classList.add("fade-out-content");
        });

        setTimeout(() => {
          elements.boxes.forEach((cur) => {
            cur.classList.remove("skeleton-loader");
            cur.classList.remove("fade-out-content");
            cur.classList.add("fade-in-content");
          });
        }, 1000);
      }, 1000);
    }
  } catch (error) {
    console.log(error);
  }
};

elements.refreshIcon.addEventListener("click", () => {
  // initiate a animation showing the data is being reloaded
  // remove the current weather data
  weatherData(true);
});

weatherData();
