const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const geocode = require('../utils/geocode')
const forecast = require('../utils/forecast')
//setup the paths for express config
const publicDirectoryPath = path.join(__dirname, '/../public')
const viewPath = path.join(__dirname, '/../templates/views')
const partialPath = path.join(__dirname, '/../templates/partials')

//setup for handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewPath)
hbs.registerPartials(partialPath)

//setup for a static path
app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.send('Hello express!')
// })
app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'zain'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'zain'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us',
        name: 'zain',
        message: 'this is a portfolio page'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'you must provide an address'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location } = {}) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
    // res.send({
    //     forecast: 50,
    //     location: 'lahore',
    //     address: req.query.address
    // })
})
app.get('/products', (req, res) => {
    if(!req.query.search){
       return res.send({
           error: 'you must provide a search term'
    })}
    console.log(req.query.search)
    res.send({
        products: []
    })
})
app.get('/help/*', (req,res) =>{
    res.render('404', {
        title: '404',
        name: 'zain',
        errorMessage: 'Help articles not found'
    })
})
app.get('*', (req,res) =>{
    res.render('404', {
        title: '404',
        name: 'zain',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})