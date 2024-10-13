//Import npm packages
import express from "express";
import axios from "axios";

//Import the key and URL from config.js
import { API_KEY, API_URL } from "./config.js";

const app = express();// Creates an instance of the Express application
const port = 3000; // Defines the port number on which the server will run
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
    const place = "Latvia"
    try {
        let icon;
        const result = await axios.get(API_URL + "&q=" + place + "&appid=" + API_KEY)
        switch (result.data.weather[0].main) {
            case "Clear":
                icon = "clear";
                break;
            case "Clouds":
                icon = "clouds";
                break;
            case "Drizzle":
                icon = "drizzle";
                break;
            case "Mist":
                icon = "mist";
                break;
            case "Rain":
                icon = "rain";
                break;    
            case "Snow":
                icon = "snow";
                break; 
            default:
                icon = "clear";
                break;
        }
        console.log(result.data.main.humidity)
        // Render the weather data
        res.render("index.ejs", {
            name: result.data.name,
            temp: Math.round(result.data.main.temp),
            wind: Math.round(result.data.wind.speed),
            humidity: result.data.main.humidity,
            icon: icon
        });
        // Handle any errors here
    } catch (error) {
        console.log(error.response.data)
        res.status(500);
    }

})
app.post("/request-city", async (req, res) => {
    const place = req.body.place;
    try {
        let icon;
        const result = await axios.get(API_URL + "&q=" + place + "&appid=" + API_KEY)
        switch (result.data.weather[0].main) {
            case "Clear":
                icon = "clear";
                break;
            case "Clouds":
                icon = "clouds";
                break;
            case "Drizzle":
                icon = "drizzle";
                break;
            case "Mist":
                icon = "mist";
                break;
            case "Rain":
                icon = "rain";
                break;    
            case "Snow":
                icon = "snow";
                break; 
            case "Fog":
                icon = "fog";
                break; 
            default:
                icon = "clear";
                break;
        }
        res.render("index.ejs", {
            name: result.data.name,
            temp: Math.round(result.data.main.temp),
            wind: Math.round(result.data.wind.speed),
            humidity: result.data.main.humidity,
            icon: icon
        });

    } catch (error) {
        console.log(error.response.data)
        res.status(500);
    }

})

// Listen for requests on the specified port 
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

