const { static } = require('express')
const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoLocation = require('./utils/geoLocation')
const forcast = require('./utils/forcast')

const app = express()

// Define paths for Express config
const resPath = path.join(__dirname,'../resources')
const viewPath = path.join(__dirname,'../templets/views')
const partialsPath = path.join(__dirname,'../templets/partials')

// Serup handlebars engine and view Location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to server
app.use(express.static(resPath))

//setting endpoint 
app.get('',(req,res) => {
    res.render('index' , {
        title : 'Dynamic HBS values',
        name : 'Ashish Rathod'
    }) //useing render for hbs
})

app.get('/about',(req,res) => {
    res.render('about',{
        name  : 'Ashish Rathod',
        email : 'rathod_ashish07@outlook.com',
        title :'About me'
    })
})

app.get('/help',(req,res) => {
    res.render('help',{
        message : 'How may i help you',
        title   : 'Help',
        name    : 'Ashish Rathod'
    })
})

app.get('/weather',(req,res) => {

    if(!req.query.address) {
        return res.send({
            error : 'address is mandatory!',
            status : 500
        })
    }

    geoLocation(req.query.address,(error,{longitude,lattitude,place }= {}) => {

        if(error){
            return res.send({
                error,
                status : 500
            })
        }

        forcast(longitude,lattitude,(error,forecastData) => {

            if(error){
                return res.send({
                    error,
                    status : 500
                })
            }

            res.send({
                status : 200,
                place,
                forecast : forecastData,
                address : req.query.address
            })
        })
    })
})

app.get('/help/*',(req,res) => {
    res.render('404',{
        errorMessage : 'Help Article not found!',
        name : 'Ashish Rathod',
        title : '404'
    })
})

app.get('/products',(req,res) => {

    if(!req.query.search){
        return res.send({
            error: 'search is mandatory!' 
        })
    }

    res.send({
        products : []
    })
})

app.get('*',(req,res) => {
    res.render('404',{
        errorMessage : 'Page not found!',
        name : 'Ashish Rathod',
        title : '404'
    })
})

app.listen(3000,() =>{
    console.log('Server is up on port 3000')
})
