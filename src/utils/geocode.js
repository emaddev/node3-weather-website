const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    address +
    ".json?access_token=pk.eyJ1IjoiZW1hZGRldiIsImEiOiJja2xvMmFncXIwb2xxMnBxcjlyNXBhbzlzIn0.LNZkSIf47TPXhzoktv7kYw";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Internet connection problem", undefined);
    } else if (body.features[1] === undefined) {
      callback("Not a valid location", undefined);
    } else {
      callback(undefined, {
        lon: body.features[0].center[0],
        lat: body.features[0].center[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
