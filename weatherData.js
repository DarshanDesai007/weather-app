const request = require('request')
const constants = require('./config')

const weatherData = (address, callback) => {
    const url = constants.openWeatherMap.BASE_URL + encodeURIComponent(address) + `&appid=` + constants.openWeatherMap.SECRET_KEY

    // console.log(url)
    request({ url, json: true }, (error, { body }) => {
        console.log("code", body.cod)
        if (body.code === 404) {
            error(`Can't fetch the data`, undefined)

        } else if (body.cod !== '404') {
            callback(undefined, {
                temperature: body.main.temp,
                description: body.weather[0].description,
                cityName: body.name,
                //    humidity:body.main.humidity
            })
        }
    })
}

module.exports = weatherData;