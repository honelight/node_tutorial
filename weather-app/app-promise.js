const request = require('request');
const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');
const axios = require('axios');

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

var address = encodeURIComponent(argv.address);
var geocodeUrl =  `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyB4kG-YebPAGWwzigo6ezNlEWGwzdAa38A`;

axios.get(geocodeUrl).then((response)=>{
    if(response.data.status === 'ZERO_RESULTS'){
        throw new Error("Could not found address");
    }
    var longitude = response.data.results[0].geometry.location.lng;
    var latitude = response.data.results[0].geometry.location.lat;
    var weatherUrl = `https://api.darksky.net/forecast/2911dfff4d13661a835e20598415f725/${latitude},${longitude}`;
    return axios.get(weatherUrl);
}).then((response)=>{
    var temperature = response.data.currently.temperature;
    var apparentTemperature = response.data.currently.apparentTemperature;
    console.log(`It's currently ${temperature}. It feels like ${apparentTemperature}`);
}).catch((error)=>{
    if(error.code === 'ENOTFOUND')
        console.log("Unable to connect to api servers");
    else{
        console.log(error.message);
    }
})
