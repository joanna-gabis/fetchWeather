const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiZ2FiaTQxMCIsImEiOiJjand0bDVqeXcweWR2NDRwNThpYWZyYWVuIn0.cErZyRcFdBvjDcl6tl82_w&limit=1`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services')
        } else if (body.features.length === 0) {
            callback('Unable to find location', undefined)
        } else {
            const result = body.features[0]
            callback(null, {
                longitude: result.center[0],
                latitude: result.center[1],
                location: result.place_name
            })
        }
    })
} 

module.exports = geocode