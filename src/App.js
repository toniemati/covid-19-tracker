import { FormControl, MenuItem, Select } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const getCountries = async () => {
      const { data } = await axios.get('https://disease.sh/v3/covid-19/countries');
      setCountries(data);
    }
    getCountries();
  }, []);

  return (
    <div className="app">
      <div className="app__header">
        <h1>covid-19 tracker 💙</h1>

        <FormControl className="app__dropdown">
          <Select variant="outlined" value="PL">
            {countries.map((country) => (
              <MenuItem key={country.countryInfo.iso2} value={country.countryInfo.iso2}>{country.country}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
        {/* title + select input */}
        
      {/* infoboxes */}
      {/* infoboxes */}
      {/* infoboxes */}

      {/* table */}
      {/* graph */}

      {/* map */}
    </div>
  );
}

export default App;