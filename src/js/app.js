import axios from "axios";
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

async function getWeather() {
  const data = await axios(
    `https://api.openweathermap.org/data/2.5/onecall?lat=43.700111&lon=-79.416298&exclude=&units=metric&appid=8c9e23c5d02aaf0137f2783f0b9db6c6`
  );

  console.log(data.data);
}

getWeather();
