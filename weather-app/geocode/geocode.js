const request = require('request');

var geocodeAddress = (address, callback) => {
    var address = encodeURIComponent(address);

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyB4kG-YebPAGWwzigo6ezNlEWGwzdAa38A`,
        json: true
    }, function (error, response, body) {
        if (error) {
            callback('Unable to connect to google service');
        }
        else if (body.status === 'ZERO_RESULTS') {
            callback("unable to find that address");
        }
        else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            })
        }
    });
};

//2911dfff4d13661a835e20598415f725

module.exports = {
    geocodeAddress: geocodeAddress
};