export const WeatherInfo = ({ weatherInfo }) => {

  const transformFarenhToCelsius = (kelvin) => {
    return (kelvin - 273).toFixed(2)
  }

  return (
    <div>
      {weatherInfo.main && weatherInfo.wind ? (<div>
        <div>Temperature: {transformFarenhToCelsius(weatherInfo.main.temp)} Celsius</div>
        <img
          src={`https://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`}
          alt={weatherInfo.weather[0].description}
        />
        <div>Wind: {weatherInfo.wind.speed} m/s</div>
      </div>) : <div>Loading weather data...</div>}
    </div>
  )
}
