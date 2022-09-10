const express = require('express');
const path = require("path");
const hbs = require("hbs");
const request = require('request');
const geoCode = require('../src/utils/geoCode')
const forecast = require('../src/utils/forecast')

// console.log(__dirname);
// console.log(__filename);

// console.log(path.join(__dirname,"../public"));

const app = express();

const publicDirectoryPath = path.join(__dirname,"../public");

const viewDirectory = path.join(__dirname,"../template/views");

const partialDirectory = path.join(__dirname,"../template/partials")

app.set('view engine','hbs');
app.set('views',viewDirectory);
hbs.registerPartials(partialDirectory)

app.use(express.static(publicDirectoryPath));

app.get("/", (req,res)=>{
    res.render("index",{
      title:"Weather app",
      name: " mohammad shahabaaz"
    })
});

app.get("/help",(req,res)=>{
    res.render('help',{
      title:"Help",
      name: " mohammad shahabaaz"
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
      title:"About",
      name: " mohammad shahabaaz"
    })
})
app.get("/weather",(req,res)=>{

  if(!req.query.address){
    return res.send({
      errorMessage:"Please put some address",
    })
  }

  geoCode(req.query.address,(error,data={})=>{
    
      if(error){
        return res.send({error})
      }

      // console.log(data)

      forecast(data.longitude,data.latitude,(error,forecastData)=>{
        if(error){
          return res.send({error})
        }
        // console.log(forecastData)
          res.send({
            forecast:forecastData,
            location:forecastData.LocationName,
            address:req.query.address
          })
      })
  })
    // res.send([{
    //     Data : {
    //     LocationName: 'Bangalore City',
    //     Country: 'India',
    //     Region: 'Karnataka'
    //   },
    //   data : {
    //     placeName: 'Bengaluru, Karnataka, India',
    //     latitude: 77.5913,
    //     longitude: 12.97912
    //   }
    // }])
})

app.get('/product',(req,res)=>{

  if(!req.query.search){
    return res.send({
      errormessage:" Please put some search terms"})
  }

  console.log(req.query)
  res.send({
    products:[]
  })
})
app.get("/help/*",(req,res)=>{
  res.render('404',{
    title:"404 Not Found",
    name: " Page not found",
    errorMessage: "Page not found, help article"
  })
})
app.get('*',(req,res)=>{
  res.render("404",{
    title:"Error Message : 404",
    name:"Page not Found"
  })
})

//app.com
//app.com/help
//app.com/about

// Goal : 
// 1.Setup an about route and render a page title,
// 2.Setup an Weather route and render a page title,/ send Json
// 3.test your work by visting both in the browser

app.listen(3000,()=>{
    console.log("Server is running on the Port 3000")
})
