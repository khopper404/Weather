require('dotenv').config();
const port =  3000;
const express = require('express');

const server = express();

server.use(express.static('public'));
server.use(express.json());

server.get('/info/:dynamic', (req, res) => {
    const { lat, long} = req.query;
    console.log(lat);
    console.log(long);
    apiCall(lat, long)
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

async function apiCall(lat, long){
    const data = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${lat},${long}`, {
        method: `GET`
    });
    console.log(data);
    const info = await data.json();
    console.log(info);
    return(info);
}


