import React from 'react'
import { WeatherInfo } from './WeatherInfo'

export const Country = ({ searchResults, weatherInfo }) => {

  return (
    <div>
      <h2>{searchResults[0].name.common}</h2>
      <div>Capital: {searchResults[0].capital && searchResults[0].capital[0]}</div>
      <div>Area: {searchResults[0].area}</div>
      <div style={{ margin: '20px 0px' }}>
        <img
          style={{ width: '150px', height: '100px' }}
          src={searchResults[0].flags.png}
          alt={`Flag of ${searchResults[0].name.common}`}
        />
      </div>
      <h3>Languages</h3>
      <ul>
        {searchResults[0].languages &&
          Object.values(searchResults[0].languages).map((lang, idLang) => (
            <li key={idLang}>{lang}</li>
          ))}
      </ul>
      <div>
        <h3>Weather in {searchResults[0].capital}</h3>
        <div>
          {weatherInfo.main && weatherInfo.wind && <WeatherInfo weatherInfo={weatherInfo}/>}
        </div>
      </div>
    </div>
  )
}
