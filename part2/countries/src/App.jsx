import axios from 'axios'
import { useState, useEffect } from 'react'

const Country = ({ country }) =>
  <div>
    <h1>{country.name.common}</h1>
    <div>Capital {country.capital}</div>
    <div>Area {country.area}</div>
    <h2>Languages</h2>
    <ul>
      {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
    </ul>
    <img
      src={country.flags.png}
    />
  </div>

const CountryLine = ({ country }) => {
  const [visible, setVisible] = useState(false)
  return <div>
    <p>{country.name.common} <button onClick={() => setVisible(!visible)}>show</button></p>
    {visible ? <Country country={country} /> : null}
  </div>
}

const Countries = ({ filtered }) => {
  if (filtered.length > 10) {
    return <p>Too many matches.</p>
  }
  else if (filtered.length == 1) {
    return <Country country={filtered[0]} />
  }
  else {
    return filtered.map(country => <CountryLine key={country.cca3} country={country} />)
  }
}

const App = (props) => {
  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState(null)
  const [filtered, setFiltered] = useState([])

  useEffect(() => {
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        setCountries(response.data)
        console.log(response.data)
      })
  }, [])

  const handleQuery = (event) => {
    setQuery(event.target.value.toLowerCase())
    setFiltered(countries.filter(country => country.name.common.toLowerCase().includes(query)
    ))
  }


  return <div>
    <form onSubmit={(event) => { event.preventDefault() }}>
      find countries:
      <input value={query} onChange={handleQuery} />
      <Countries filtered={filtered} />
    </form>
  </div>
}

export default App
