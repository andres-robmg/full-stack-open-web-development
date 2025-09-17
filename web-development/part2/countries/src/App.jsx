import axios from 'axios'
import { useEffect, useState } from 'react'
import { ResultsNotification } from './components/ResultsNotification'
import { Country } from './components/Country';

import weatherService from './services/WeatherService'
import countryService from './services/CountryService'
import { NoMatchesNotification } from './components/NoMatchesNotification';
import { SearchResults } from './components/SearchResults';


const API_URL = 'https://studies.cs.helsinki.fi/restcountries'
const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const WEATHER_API_URL = `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=${WEATHER_API_KEY}`


function App() {
  const [searchString, setSearchString] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [debounceTimer, setDebounceTimer] = useState(null)
  const [weatherInfo, setWeatherInfo] = useState({})

  const handleChangeInput = (e) => {
    setSearchString(e.target.value)
  }

  const handleClickButtonShow = (countryName) => {
    setSearchString(countryName)
    if (searchResults.length === 1) {
      getWeatherInfo()
    }
  }

  const getWeatherInfo = (lat, long) => {
    const url = WEATHER_API_URL.replace('{lat}', lat).replace('{lon}', long)
    if (searchResults && searchResults.length === 1) {
      weatherService.getWeather(url)
        .then(response => {
          setWeatherInfo(response.data)
        })
    }
  }

  const getAllCountries = () => {
    const url = `${API_URL}/api/all`
    countryService.getAllCountries(url)
      .then(response => {
        const filtered = response.data.filter(
          country => country.name.common.toLowerCase().includes(searchString.toLowerCase())
        )
        setSearchResults(filtered)
      })
  }

  // useEffect for GET weather info
  useEffect(() => {
    if (searchResults.length === 1) {
      const country = searchResults[0]
      if (country.capitalInfo && country.capitalInfo.latlng) {
        const [lat, lon] = country.capitalInfo.latlng
        getWeatherInfo(lat, lon)
      }
    } else {
      setWeatherInfo({})
    }
  }, [searchResults])


  // useEffect debouncer for GET all countries
  useEffect(() => {
    if (debounceTimer) clearTimeout(debounceTimer)
    if (searchString === '') {
      setSearchResults([])
      return
    }
    const timer = setTimeout(() => {
      getAllCountries()
    }, 500)
    setDebounceTimer(timer)
    return () => clearTimeout(timer)
  }, [searchString])

  return (
    <div>
      <div>find countries</div>
      <div>
        <input
          value={searchString}
          onChange={handleChangeInput}
          type='text'
        />
      </div>
      <div>
        {searchResults.length === 0 ? (
          <NoMatchesNotification />
        ) : searchResults.length === 1 ? <Country searchResults={searchResults} weatherInfo={weatherInfo} /> : searchResults.length < 10 ? (
          <div>
            {searchResults.map((country, idCountry) => (
              <SearchResults country={country} handleClickButtonShow={handleClickButtonShow} key={idCountry} />
            ))}
          </div>
        ) : (
          <ResultsNotification />
        )}

      </div>
    </div>
  )
}

export default App
