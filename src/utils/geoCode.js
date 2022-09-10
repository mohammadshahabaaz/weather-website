const request = require('request');

const geoCode = (address,callback)=>{

    Geourl= `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoic2hhaGFiYWF6MDU1NSIsImEiOiJjbDZrdHN5ZDAwNWFpM25tZXZlODNqc3lwIn0.26JSA2hjJEN8D2weX9cKUg`;

    request({url:Geourl,json:true},(error,response)=>{
        if(error){
            callback(`Unable to run the server`,undefined);
        }else if (response.body.features.length === 0){
            callback(`not found`,undefined);
            console.log(response.body.message)
        }else{
            callback(undefined,{
                placeName:response.body.features[0].place_name,

            latitude : response.body.features[0].center[0],
            longitude : response.body.features[0].center[1],
            })
        
            
        }
    })

}

module.exports = geoCode


// const Geourl = "https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1Ijoic2hhaGFiYWF6MDU1NSIsImEiOiJjbDZrdHN5ZDAwNWFpM25tZXZlODNqc3lwIn0.26JSA2hjJEN8D2weX9cKUg";

// request({url:Geourl,json:true}, (error, response)=>{

//   if(error){
//     console.log(`Unable to run the server`);
//   }else if(response.body.message){
//     console.log(`Not Found`)
//   }else{
//     const place = response.body.features[0].place_name;

//     const latitude = response.body.features[0].center[0];
//     const longitude = response.body.features[0].center[1];

//     console.log(place,latitude,longitude)
//   }

// })
