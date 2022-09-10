
const request = require('request')

const forecast = (lon,lan,callback) => {

    // const lan = 79;
    // const lon = 89;
  
    const url =`http://api.weatherstack.com/current?access_key=f2ea91ad4f6ef2e3f0a01f09d113d546&query=${lon},${lan}&units=m`;
    
    request({url:url,json:true},(error,response)=>{
    
        if(error){
            callback(`Unable to connect the server`,undefined)
           
        }else if(response.body.error){
            callback(`unable to find the input`,undefined)
           
        }else{
            // callback(undefined,`the current temperature is ${response.body.current.temperature} degree celsius and there is chance of ${response.body.current.weather_descriptions[0]}`);
            callback(undefined,{
                weather: response.body.current.weather_descriptions[0],
                temperature:response.body.current.temperature,
                LocationName: response.body.location.name,
                Country : response.body.location.country,
                Region: response.body.location.region
            })
          
        }
        
    })
    
    };

    module.exports = forecast;


    