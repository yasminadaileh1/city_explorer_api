require('dotenv').config();
const express = require('express');
// create our app 
// expose the prototype that will get set on requests
// expose the prototype that will get set on responses

const cors = require('cors');
// cors origin source sharing

const PORT = process.env.PORT || 4000;
// we write it in the .env file also an alternative for it in case the server shutdown.

const app = express();
// app.handle (req, res, next);

app.use(cors());

// lecotion request & the respone will be new object we have it form the constructor refferd to JOSN file.
app.get('/location', (request , response) => {
    try {
    const geoData = require('./data/geo.json');
    const city = request.query.city ;
    const locationData = new Location(city, geoData);
    response.status(200).json(locationData);
    } catch (error) {
        errorHandler(error, request, response);
      }
});
app.get('/weather', (request , response) => {
     let emptyArr = [];
    const weatherData = require('./data/darksky.json');
    weatherData.data.forEach(element => {
        const weatherNow = new Weather(element);
        emptyArr.push(weatherNow);
    });
    response.status(200).json(emptyArr);
});

function errorHandler(error, request, response) {
    response.status(500).send(error);
  }
// here we want all the data not just the first index so we should use forEach of map to go through all the index and get the data

//constructor function 
function Location ( city , geoData){
    this.search_query = city;
    this.formatted_query = geoData[0].display_name;
    this.latitude = geoData[0].lat;
    this.longitude = geoData[0].lon;
}
function Weather (weatherData){
    this.forecast = weatherData.weather.description ;
    this.datetime = new Date(weatherData.valid_date).toDateString()
}

app.use('*', (request, response) => response.status(404).send('404 page not found'));



app.use('*', (request, response) => response.status(404).send('404 page not found'));
app.listen(PORT,() => console.log( ` this is our express ${express}`));
app.listen(PORT,() => console.log( ` this is our app ${app}`));
app.listen(PORT,() => console.log(`Listening to port ${PORT}`));


