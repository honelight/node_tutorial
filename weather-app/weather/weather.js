const request = require('request');

var getWeather = (longitude, latitude, callback) => {
    request({
        url: `https://api.darksky.net/forecast/2911dfff4d13661a835e20598415f725/${latitude},${longitude}`,
        json: true
    }, (error, response, body) => {
        if (error) {
            console.log("here");
            callback('Unable to connect to weather service');
        } else if (response.statusCode === 400) {
            console.log('Unable to fetch weather');
        } else {
            callback(undefined, {
                currently: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature
            });
        }
    })
}

module.exports = {
    getWeather: getWeather
}