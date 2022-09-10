


// fetch("http://localhost:3000/weather?address=hyderabad").then((response)=>{
//     response.json().then((data)=>{
//         if(data.error){
//             console.log(data.error)
//         }else{
//             console.log(data.location);
//             console.log(data.forecast)
//         }
//     })
// })


const weatherForm = document.querySelector("form");

const search = document.querySelector('input');

const msgOne = document.querySelector("#msg-1");

const msgTwo = document.querySelector("#msg-2");



weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const location = search.value;
    // console.log(location);

    msgOne.textContent = "loading message.....";
    msgTwo.textContent = " "

   if(!location){
    // console.log("Please enter the location");
    msgOne.textContent = "Please enter the location";
   }else {
    fetch(`/weather?address=${location}`).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                // console.log(data.error)
                msgOne.textContent = data.error;
            }else{
                // console.log(data.location);
                // console.log(data)
                msgOne.textContent = `Location : ${data.location}`;
                    const forCast =  data.forecast;
                msgTwo.textContent = `The current temperature is ${forCast.temperature} degree in ${data.address},${forCast.LocationName},${forCast.Country}. The weather is ${forCast.weather}. `

            }
        })
    })
   }
    
})



// console.log(weatherForm)