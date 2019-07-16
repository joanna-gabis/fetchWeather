const request = require('request')

const forecast = (lon, lat, callback) => {
    const url =`https://api.darksky.net/forecast/59632206dc56e0bd4405835adc310a0a/${parseFloat(lat)},${parseFloat(lon)}?units=si`

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to service', null)
        } else if (body.error) {
            callback(null, body.error)
        } else {
            const currently = body.currently
            callback(null, `${body.daily.data[0].summary} It is currently ${currently.temperature} degrees out. There is ${currently.precipProbability}% chance of rain. Max temperature today: ${body.daily.data[0].temperatureMax} degrees, minimal tempretature: ${body.daily.data[0].temperatureMin} degrees.`)
        }
    })
}


module.exports = forecast