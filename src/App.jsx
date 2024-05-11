import {useEffect, useRef, useState } from 'react';
import './App.css'
import axios from 'axios';
import ClimaCiudad from './components/weather-card/ClimaCiudad';

function App() {
  
  const apiKey ='4feb36af317632b1afdc64dcf00974f9'

  const [weather, setWeather] = useState([])
  
  const inputRef = useRef();

  useEffect(() =>{
    getCurrentLocation()
  }, [])


  async function obtenerTemperatura(city){
    
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

    const response = await axios.get(URL)

    setWeather({
       temp: response.data.main.temp,
       city: response.data.name,
       icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
       register: formatDateTime(response.data.dt),
       feelsLike: response.data.main.feels_like,
       humidity: response.data.main.humidity
    })
  }

  function formatDateTime(fechaUnix){
    const dt = fechaUnix * 1000;

    const dateFormat = new Intl.DateTimeFormat("es-ar", {
      hour: '2-digit',
      minute: '2-digit',
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })

    return dateFormat.format(dt).split(",").reverse().join(" ").trim()
  }

  function handleSearchCity(evt){
    if(evt.key === "Enter"){
      const citySelected = evt.target.value;
      obtenerTemperatura(citySelected);
      inputRef.current.value = '';

      localStorage.setItem("weatherCity", JSON.stringify(citySelected));
    }
  }

  function getCurrentLocation(){
    if(window.navigator.geolocation){ 
      navigator.geolocation.getCurrentPosition( 
          (position) => {
              const lat = position.coords.latitude;
              const lon = position.coords.longitude;

              getWeatherByCoordinates(lat, lon);
          },
          (error)=>{
              console.error('No se pudo obtener la posición', error)

              const citySaved = JSON.parse(localStorage.getItem("weatherCity")) || "Buenos Aires" 

              obtenerTemperatura(citySaved)
          }
      ) 

  }
  }

  async function getWeatherByCoordinates(latitude, longitude){
    const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric` 
    
    const response = await axios.get(URL)

    const cityByCoordinates = response.data.name

    obtenerTemperatura(cityByCoordinates)
}

  return (
    <>
      <ClimaCiudad weather={weather} handleSearchCity={handleSearchCity} inputRef={inputRef} />
    </>
  )
}

export default App
