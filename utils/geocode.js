const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoicGhvbmdodWEiLCJhIjoiY2tsYzFrZ2s5MG1pMDJ4bzNzMDQzcXdqNyJ9.Mso5H3uD6oDAyQqWDBpp8w&limit=1`;
    request({ url, json: true }, (error, {body}={}) => {
        if (error) {
            callback('Unable to connect to geocoding service!', undefined);
        }
        else if (!body.features || body.features.length === 0 || body.features[0].center.length === 0) {
            if (body.message)
                callback(body.message, undefined)
            else
                callback('Unable to find location. Try another search!', undefined);
        }
        else 
        {
            const [longitude, latitude] = body.features[0].center;
            callback(undefined, {
                latitude,
                longitude,
                location: body.features[0].place_name
            })
        }
            
    })
}

module.exports = geocode