const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs.options({
    a: {
        demand: true,
        alias: 'address',
        describe: 'Address to fetch weather for',
        string: true
    }
}).help()
    .alias('help', 'h')
    .argv;


geocode.geocodeAddress(argv.a, (errorMessage, results) => {
    if (errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(JSON.stringify(results, undefined, 2));
        var lon = results.longitude;
        var lat = results.latitude;
        weather.getWeather(lon, lat, (errorMessage, results) => {
            if (errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(JSON.stringify(results, undefined, 2));
            }
        });
    }
});

// var address = encodeURIComponent(argv.a);

// request({
//     url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyB4kG-YebPAGWwzigo6ezNlEWGwzdAa38A`,
//     json: true
// }, function(error, response, body){
//     if(error){
//         console.log('Unable to connect to google service');
//     }
//     else if(body.status === 'ZERO_RESULTS'){
//         console.log("unable to find that address");
//     }
//     else if(body.status === 'OK'){
//         console.log(`Address: ${body.results[0].formatted_address}`);
//         console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
//         console.log(`Longtitude: ${body.results[0].geometry.location.lng}`);
//     }
// })