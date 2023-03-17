// here we create endpoints for our api
const express = require('express');
const req = require('express/lib/request');
const hbs = require('hbs');
const path = require('path');
const app = express();

const weatherData = require('../weatherData')

const port = process.env.PORT || 3000;

// specifying the path to our public folder having static assets
const publicStaticDirPath = path.join(__dirname,'../public')

const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath)

app.use(express.static(publicStaticDirPath))

// create a default route for our server
app.get('/', (req,res)=>{
    // res.send('This is the default Route...')
    res.render('index',{
        title: 'Weather App'
    })
})

// route to get the weather data
// localhost:3000/weather?address=lahore
app.get('/weather', (req,res) => {
    const address = req.query.address

    if(address === '' ){

        console.log("add",address)
        return res.send({
            error: "Please enter a valid location to search weather"
        })
     }
    // else if(address !== address){
    //     return res.send({
    //         error: "3342Please enter a location to search weather"
    //     })
    // }else {
        weatherData(address,(error, {temperature, description,cityName,humidity}) => {
            if(error){
                return res.send({
                    error
                })
            } 
            console.log(temperature,description,cityName,humidity)
            res.send({
                temperature,
                description,
                cityName,
                // humidity
            })
        })
    // }
   
})

// route if a page doesnot exist (404)
app.get('*',(req,res) => {
    // res.send('This is page not found endpoint')
    res.render('404', {
        title: 'Page not Found'
    })
})

app.listen(port, () => {
    console.log('Server is up and running on port: ', port)
});

