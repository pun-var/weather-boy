const { json } = require("express");
const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){

    res.sendFile(__dirname + "/index.html");

})

app.post("/", function(req, res){
    const apiKey = "1b883683fc9b362a5625091efdf5c8a4";
    const query = req.body.cityName;
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query + "&appid=" + apiKey + "&units=" + unit;
    
    https.get(url, function(response) {

        console.log(response.statusCode);

        response.on('data', function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const descr = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

            res.write("<h1> the temperature in " + query +" is "+ temp + " degrees celcius </h1>")
            res.write("<p> the weather is currently " + descr + ".</p>");
            res.write("<img src=" + imageURL + ">");
            res.send();
            
        });
    });
})

app.listen(3000, function () {
    console.log("server is running on port 3000");
})