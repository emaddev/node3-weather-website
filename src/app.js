const express = require("express");
const path = require("path");
const hbs = require("hbs");
const { query } = require("express");
const request = require("request");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsDirectoryPath = path.join(__dirname, "../templates/views");
const partialPath = path.join(__dirname, "../templates/partials");

//Setup Engine and views Location for handlebars
app.set("view engine", "hbs");
app.set("views", viewsDirectoryPath);
//take the path that partials live in
hbs.registerPartials(partialPath);

//Setup static express
app.use(express.static(publicDirectoryPath));

//
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Emad Roghani",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me",
    name: "Emad Roghani",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    tel: "+49 2332 123 322",
    email: "name@example.com",
  });
});

//weather page
app.get("/weather", (req, res) => {
  const address = req.query.address;
  if (!address) {
    return res.send({
      error: "You didn't provide any address",
    });
  }

  geocode(address, (error, { lat, lon, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast({ lon, lat }, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }

      res.send({
        location: location,
        forecast: forecastData,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "The help article could not be found",
  });
});

//It must to be written at the end of the app.get() methods
//otherweis it be absoulut problem
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    message: "the page not found",
  });
});

app.listen(3000, () => {
  console.log("the server is running");
});
