const request = require('request')

//now using shorthand and destructuring
const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=644f1bec82f61535a2e5227afc31dadb&query='+latitude+','+longitude+'&units=f';
    request({url, json: true}, (error,{ body }) =>{     //body => obj destructuring, url => shorthand notation
        if(error){
            callback('Unable to connect to weather services', undefined)
        }else if(body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, `
            ${body.current.weather_descriptions[0]}. The temperature is currently ${body.current.temperature} 
            degrees out but it feels like it is ${body.current.feelslike}. `
                // weather_description: body.current.weather_descriptions[0],
                // temperature: body.current.temperature,
                // feelslike: body.current.feelslike
            )
        }
    })
}
/*const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=644f1bec82f61535a2e5227afc31dadb&query='+latitude+','+longitude+'&units=f';
    request({url: url, json: true}, (error,response) =>{
        if(error){
            callback('Unable to connect to weather services', undefined)
        }else if(response.body.error){
            callback('Unable to find location', undefined)
        }else{
            callback(undefined, {
                weather_description: response.body.current.weather_descriptions[0],
                temperature: response.body.current.temperature,
                feelslike: response.body.current.feelslike
            })
        }
    })
}*/
module.exports = forecast