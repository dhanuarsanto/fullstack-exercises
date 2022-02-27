import {useState, useEffect} from 'react'
import axios from 'axios'

const SingleDisplay = ({country}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      <div>capital {country.capital}</div>
      <div>area {country.area}</div>
      <h3>Languages:</h3>
      <ul>
        {Object.entries(country.languages).map(([key,value])=>
          <li key={key}>{value}</li>
        )}
      </ul>
      <img
        src={country.flags.png}
        alt={country.name.official}
        border='1px'
      />
    </div>
    )
}

const Display = ({countries,search}) => {
  return (
    !countries.length && search.length > 0
    ? <div>No countries</div>
    : countries.length > 10
      ? <div>Too many matches, specify another filter</div>
      : countries.length === 1
        ? <SingleDisplay country={countries[0]} />
        : countries.map(country=>
            <div key={country.name.common}>{country.name.common}</div>
          )
    )
}
const App = () => {
  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState('')
  
  const hook = () => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response=>{
        console.log('promise fullfilled')
        setCountries(response.data)
      })
  }
  
  useEffect(hook, [])
  
  const handleSearch = (event) => setSearch(event.target.value)
  
  const countryToShow = search === ''
  ? []
  : countries.filter(country=>
      country.name.common.toLowerCase().indexOf(search.toLowerCase()) !== -1
    )

  return (
    <div>
      <div>
        find countries
        <input value={search} onChange={handleSearch} />
        <Display countries={countryToShow} search={search} />
      </div>
    </div>
  )
}

export default App