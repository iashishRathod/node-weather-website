const request = require('postman-request')

const weather = (longitude,lattitude,callback) =>{

    const url = 'http://api.weatherstack.com/current?access_key=a7bd0ee0377d6bf86400c0f570fde324&query='+longitude+','+lattitude+'&units=f'
    
    request({url,json:true},(error,{body}={}) => {

        if(error){
            callback('Unable to connect to weather services, Please try again later',undefined)
        }
        else {
            if(body.error){
                callback(body.error.info,undefined)
            }
            else {
                callback(undefined, body.current.weather_descriptions[0] +'. current temprature is ' + body.current.temperature +
                ' and it feels like ' + body.current.feelslike)
            }
            
        }
    
    })

}

module.exports = weather