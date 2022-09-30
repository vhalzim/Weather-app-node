const express = require("express");
const bodyParser = require ("body-parser");
const https = require ("https");
const app = express();

app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req,res)=>{
    res.sendFile(__dirname + "/index.html")
})


app.post("/", (req,res)=>{
    const value = req.body.cityName

    const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q="+value+"&appid=cf30a027304b34074a347b30adcc5955"
    https.get(url, (response)=>{
        response.on("data",(data)=> {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const icon = weatherData.weather[0].icon;
            const imgUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png"
            const description = weatherData.weather[0].description;
            res.write ("<h1>The temperature is "+ temp + " degrees</h1>")
            res.write("<p>the weather is cunrrently "+ description +"</p>")
            res.write("<img src="+imgUrl+" />")
            res.send()

        })
    })

})

app.get("/weather", (req,res)=>{
   
})




app.listen("3000", ()=>{
    console.log("app is running in port 3000")

})