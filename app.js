//node app.js "Colombo, Sri Lanka"

const request = require('request');
const geo = require('mapbox-geocoding');
require('dotenv').config();

geo.setAccessToken(process.env.WEATHERSTACK_API_KEY);

// Geocode an address to coordinates
const fetchData = (url) => {
	request({ url, json: true }, function(error, response) {
		const { temperature, feelslike, weather_descriptions } = response.body.current;
		console.log('Weather description: ' + weather_descriptions[0]);
		console.log(`It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`);
	});
};

const getWeatherData = () => {
	const place = process.argv[2];
	geo.geocode('mapbox.places', place, function(err, geoData) {
		if (err) {
			console.log('Network error!!!');
		} else {
			try {
				const [ longitude, latitude ] = geoData.features[0].geometry.coordinates;
				const url = `http://api.weatherstack.com/current?access_key=a8b4bfbbfea85a597a3e9be443fb056d&query=${latitude},${longitude}&units=f`;
				fetchData(url);
			} catch (error) {
				console.log('No matching results!');
			}
		}
	});
};

getWeatherData();
