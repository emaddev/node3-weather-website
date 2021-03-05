const request = require("request");

const forecast = ({ lon, lat }, callback) => {
  const url =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "7&appid=85343d121970b479ff1fcdb5d4685354";

  request({ url, json: true }, (error, { body }) => {
    debugger;
    if (error) {
      callback("Check your Internet Connection", undefined);
    } else if (body.cod === 400) {
      callback("The Location didn't find", undefined);
    } else {
      const data = {
        temperature: Math.round(body.current.temp - 273) + " C",
        description: body.current.weather[0].description,
        humidity: body.current.humidity + "%",
        timezone: body.timezone,
      };
      callback(
        undefined,
        "The weather out here is " +
          data.temperature +
          " and " +
          data.description +
          " and there is " +
          data.humidity +
          " humidity"
      );
    }
  });
};

module.exports = forecast;
