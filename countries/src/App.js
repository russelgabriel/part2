import {useState, useEffect} from 'react'
import axios from 'axios'


const App = () => {

  const [countries, setCountries] = useState([])
  const [searchCountry, setSearchCountry] = useState("")
  const [chosenCountry, setChosenCountry] = useState({})

  useEffect(() => {
    console.log("effect");
    axios
      .get("https://restcountries.com/v3.1/all")
      .then(response => {
        console.log("promise fulfilled");
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
      handleChooseCountry={handleChooseCountry}/>
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

const Display = ({countriesToShow, chosenCountry, handleChooseCountry}) => {
  const numCountries = countriesToShow.length
  if (numCountries > 10) {
    return (
      <div>
        Too many matches, be more specific
      </div>
    )
  }
  if (numCountries <= 10 && numCountries > 1) {
    return (
      <div>
        <ul>
          {countriesToShow.map(country => 
            <li key={country.name.official}>
              {country.name.common} <Button clickHandler={handleChooseCountry} country={country} />
            </li>
          )}
        </ul>
        <CountryInfo country={chosenCountry} />
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
      <CountryInfo country={countriesToShow[0]} />
    </div>
  )
}

const CountryInfo = ({country}) => {
  if (Object.keys(country).length === 0) {
    return (
      <div>

      </div>
    )
  }
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
    </div>
  )
}

const Button = ({clickHandler, country}) => <button onClick={() => clickHandler(country)}>show</button>

export default App;
