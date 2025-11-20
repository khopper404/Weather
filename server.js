require('dotenv').config();
const port =  3000;
const express = require('express');

const server = express();

const maxFreeDays = 3; //free api subscription only allows for 3 days of forecast :(

server.use(express.static('public'));
server.use(express.json());

server.get('/info/:dynamic', (req, res) => {
    const {lat, long} = req.query;
    console.log(lat);
    console.log(long);
        apiCallForecast(lat, long)
        .then(result => {
            console.log("Result:", result);
            res.status(200).json
                ({ result});
        })
        .catch(error => {
            console.error("Error:", error);
        });
    
});


server.listen(port, function(error) {
    if(error){
        console.log("something went wrong dumass", error);
    } else{
        console.log("all good " + port);
    }
})

async function apiCallCurrent(lat, long){
    const data = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${lat},${long}`, {
        method: `GET`
    });
    console.log(data);
    const info = await data.json();
    console.log(info);
    return(info);
}

async function apiCallForecast(lat, long){
    const data = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${process.env.API_KEY}&q=${lat},${long}&days=${maxFreeDays}`, {
        method: `GET`
    });
    console.log(data);
    const info = await data.json();
    console.log(info);
    return(info);
}

