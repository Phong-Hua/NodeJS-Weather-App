const request = require('request')
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

const forecast = (latitude, longitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=3442561d95e5c7244b4b35c26fe3e5a7&query=${latitude},${longitude}`;
    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined);
        }
        else if (body.error) {
            if (body.error.info)
                callback(body.error.info, undefined)
            else
                callback('Unable to find location', undefined)
        }
        else
        {
            const {temperature, feelslike, weather_descriptions, precip: precipitation} = body.current;
            callback(undefined, `The weather is ${weather_descriptions.join(', ')}. It is ${temperature} degrees out and feels like ${feelslike} degrees. There is a ${precipitation}% chance of rain.` )
        }
    })
}

module.exports = forecast