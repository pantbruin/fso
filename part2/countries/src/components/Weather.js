import { useState, useEffect } from "react";
import axios from "axios";

const Weather = ({ countryObject }) => {
    
    console.log(countryObject)

    const [lat, lon] = countryObject.capitalInfo.latlng;
    const api_key = process.env.REACT_APP_API_KEY;
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=imperial`

    const [weatherData, setWeatherData] = useState(null);

    useEffect(() => {
        axios.get(weatherUrl)
            .then((response) => setWeatherData(response.data))
    },[])

    if (weatherData === null) return null;

    return(
        <div>
            <h2>Weather in {countryObject.capital[0]}</h2>
            <p>temperature {weatherData.main.temp} Fahrenheit</p>
            <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt='weather icon'/>
            <p>wind {weatherData.wind.speed} m/s</p>
        </div>
    )

}

export default Weather;