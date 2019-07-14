const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

// paths for express config
const publicDirectoryPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// set handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// set up static directory
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Asia'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Asia'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Asia',
        helpMessage: 'This is a help message!'
    })
})
app.get('/weather', (req, res) => {
    let requestedLocation = req.query.address
    if (!requestedLocation) {
        return res.send({
            error: 'Please provide address'
        })
    }

    geocode(requestedLocation, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        let lon = longitude
        let lat = latitude
        forecast(lon, lat, (error, forecast) => {
            if (error) {
                return res.send({ error })
            }
            res.send({ location, forecast, address: req.query.address})
        })
    })
})
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'please provide a search string'
        })
    }
    res.send({
        products: []
    })
})


app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Error',
        name: 'Asia',
        errorMessage: 'Help article not found'
    })
})
app.get('*', (req, res) => {
    res.render('error', {
        title: 'Error',
        name: 'Asia',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})