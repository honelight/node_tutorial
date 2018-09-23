let geocode = require('../geocode/geocode');

var geocodeAddress = (address)=>{
    return new Promise((resolve,reject)=>{
        geocode.geocodeAddress(address,(error, body)=>{
            if(error){
                reject(error);
            }else{
                resolve(body);
            }
        })
    })
};

let zipCode='xvxcvxc';

geocodeAddress(zipCode).then((location)=>{
    console.log(JSON.stringify(location, undefined, 2));
    return geocodeAddress((parseInt(zipCode)+1).toString());
}).then((res)=>{
    console.log(JSON.stringify(res, undefined, 2));
}).catch((error)=>{
    console.log(error);
});