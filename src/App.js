import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import InfoBox from './components/InfoBox/InfoBox';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('wordwide');

  const handleChangeCountry = (e) => {
    const country = e.target.value;

    setCountry(country);
  };

  useEffect(() => {
    const getCountries = async () => {
      const { data } = await axios.get('https://disease.sh/v3/covid-19/countries');
      const countries = data.map((country) => ({
        name: country.country,
        value: country.countryInfo.iso2
      }));
      setCountries(countries);
    }
    getCountries();
  }, []);

  return (
    <div className="app">
      <div className="app__header">
        <h1>covid-19 tracker 💙</h1>

        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={handleChangeCountry}>
            <MenuItem value="wordwide">Wordwide</MenuItem>
            {countries.map((country) => (
              <MenuItem key={country.name} value={country.value}>{country.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      
      <div className="app__stats">
        <InfoBox />
      </div>

      {/* table */}
      {/* graph */}

      {/* map */}
    </div>
  );
}

export default App;