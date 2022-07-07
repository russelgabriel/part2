import {useState, useEffect} from 'react'
import axios from 'axios'


const App = () => {

  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState("")
  const [chosenCountry, setChosenCountry] = useState({})
  const [weatherInfo, setWeatherInfo] = useState({})

  useEffect(() => {
    console.log("country effect");
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        console.log("country promise fulfilled");
        setCountries(response.data) 
      })
  }, [])

  const countriesToShow = countries.filter(country => 
    country.name.common.toLowerCase()
      .includes(searchCountry.toLowerCase())
  )

  const handleFilterChange = event => {
    setSearchCountry(event.target.value)
    setChosenCountry({})
  }

  const handleChooseCountry = country => {
    setChosenCountry(country)
  }

  return (
    <div>
      <Filter handleFilterChange={handleFilterChange}/>
      <Display countriesToShow={countriesToShow} chosenCountry={chosenCountry} 
      handleChooseCountry={handleChooseCountry} weatherInfo={weatherInfo} 
      setWeatherInfo={setWeatherInfo}/>
    </div>
  )
}

const Filter = ({handleFilterChange}) => {
  return (
    <div>
      Find countries
      <input onChange={handleFilterChange}/>
    </div>
  )
}

const Display = ({countriesToShow, chosenCountry, handleChooseCountry, weatherInfo, setWeatherInfo}) => {
  const numCountries = countriesToShow.length
  if (numCountries > 10) {
    return (
      <div>
        Too many matches, be more specific
      </div>
    )
  }
  if (numCountries <= 10 && numCountries > 1 && Object.keys(chosenCountry).length !== 0) {
    return (
      <div>
        <ul>
          {countriesToShow.map(country => 
            <li key={country.name.official}>
              {country.name.common} <Button clickHandler={handleChooseCountry} country={country} />
            </li>
          )}
        </ul>
        <CountryInfo country={chosenCountry} weatherInfo={weatherInfo} 
        setWeatherInfo={setWeatherInfo}/>
      </div>
    )
  }
  if (numCountries <= 10 && numCountries > 1 && Object.keys(chosenCountry).length === 0) {
    return (
      <div>
        <ul>
          {countriesToShow.map(country => 
            <li key={country.name.official}>
              {country.name.common} <Button clickHandler={handleChooseCountry} country={country} />
            </li>
          )}
        </ul>
      </div>
    )
  }
  if (numCountries === 0) {
    return (
      <div>
        Sorry, there are no matches
      </div>
    )
  }

  return (
    <div>
      <CountryInfo country={countriesToShow[0]} weatherInfo={weatherInfo} 
      setWeatherInfo={setWeatherInfo}/>
    </div>
  )
}

const CountryInfo = ({country, weatherInfo, setWeatherInfo}) => {

  const apiKey = process.env.REACT_APP_API_KEY
  const lat = country.capitalInfo.latlng[0]
  const lon = country.capitalInfo.latlng[1]

  console.log(country);

  useEffect(() => {
    console.log("weather effect");
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`)
      .then(response => {
        console.log("weather promise fulfilled");
        console.log(response.data);
        setWeatherInfo(response.data)
      })
  }, [])

  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>
        Capital: {country.capital[0]}
        <br/>
        Area: {country.area}
      </p>
      <h3>Langauges:</h3>
      <ul>
        {Object.values(country.languages).map(lang => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={country.flags.png} />
      <Weather country={country} weatherInfo={weatherInfo} setWeatherInfo={setWeatherInfo} />
    </div>
  )
}

const Button = ({clickHandler, country}) => <button onClick={() => clickHandler(country)}>show</button>

const Weather = ({country, weatherInfo}) => {

  if (Object.keys(country).length === 0 || Object.keys(weatherInfo).length === 0) {
    return (
      <div>

      </div>
    )
  }

  const temp = weatherInfo.main.temp - 273.15

  return (
    <div>
      <h2>Weather in {country.capital[0]}</h2>
      <p>Temperature: {temp} °C</p>
      <img src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} />
      <p>Wind: </p>
    </div>
  )
}

export default App;
