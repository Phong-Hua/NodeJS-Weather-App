const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../utils/geocode');
const forecast = require('../utils/forecast');
const app = express()

// Define paths for Express config
const publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectory))

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Phong Hua'
    });
})

app.get('/weather', (req, res) => {
    if (!req.query.address)
        return res.send('You must provide an address')
    const address = req.query.address;
    geocode(address, (error, {latitude, longitude, location } = {}) => {
        if (error)
            return res.send({
                error: error
            })
        forecast(latitude, longitude, (error, forecastData) => {
            if (error)
            return res.send({
                error: error
            })
            res.send({
                location,
                forecastData,
            })
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Phong Hua'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'Hi! How can I help',
        name: 'Phong Hua'
    })
})

// Match any pages start with /help/ that has not match so far
app.get('/help/*', (req, res) => {
    res.render('404page', {
        title: 'Help page',
        message: 'Help article not found',
        name: 'Phong Hua'
    })
})

app.get('/products', (req, res) => {
    console.log(req.query)
    if (!req.query.search)
        return res.send('You must provide a search term')
    res.send({
        products: []
    })
})

// Match everythings else has not match previous routes
app.get('*', (req, res) => {
    res.render('404page', {
        title: 'Error',
        message: 'My 404 page',
        name: 'Phong Hua'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})