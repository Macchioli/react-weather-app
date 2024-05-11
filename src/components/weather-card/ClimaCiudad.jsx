
import './ClimaCiudad.css'

import { Icon } from 'react-icons-kit'
import { droplet } from 'react-icons-kit/icomoon/droplet'
import {thermometer1} from 'react-icons-kit/fa/thermometer1'

export default function ClimaCiudad({weather, handleSearchCity, inputRef}){

    return(
    <>
        <div className={ weather.temp > 28 ? 'weather-container class-hot' : weather.temp < 10 ? 'weather-container class-cold' : 'weather-container'} >
          <h2>React weather app</h2>
          <div className="weather-input-container">
              <input type="text" id="weather-search" className="weather-input" placeholder="Ingrese la ciudad..." onKeyUp={handleSearchCity} ref={inputRef} />
          </div>
          <div className="weather-info">
              <div className="weather-info__city" id="weather-location"> 
                  {weather.city}
              </div>
              <div className="weather-info__temp" id="weather-temp">
                  {weather.temp} °C
              </div>
              <div className="details-weather">
                  <div className='feelsLike-weather' title='Sensación térmica'>
                    <div className="icon-container" style={{width: 24, height: 24}}>
                        <Icon size={'50%'}  icon={thermometer1}  />
                    </div>
                    <span>{weather.feelsLike}°C</span>
                  </div>
                  <div className="humidity-weather" title="Porcentaje de humedad">
                    <div className="icon-container" style={{width: 24, height: 24}}>
                        <Icon size={'90%'} icon={droplet}  /><br />
                    </div>
                    <span>{weather.humidity}%</span>
                  </div>
              </div>
              <div className="weather-info__icon">
                  <img src={weather.icon} alt="Icono de temperatura" />
              </div>
              <div className="weather-datetime-container">
                  <span>Registro:</span> {weather.register}
              </div>
          </div>
      </div>
        
    </>
    )

}