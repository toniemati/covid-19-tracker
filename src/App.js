import { FormControl, MenuItem, Select, Card, CardContent } from '@material-ui/core';
import { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import InfoBox from './components/InfoBox/InfoBox';
import Map from './components/Map/Map';
import Table from './components/Table/Table';
import { sortData } from './utills';
import LineGraph from './components/LineGraph/LineGraph';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('wordwide');
  const [countryInfo, setCountryInfo] = useState({});

  const handleChangeCountry = async (e) => {
    const country = e.target.value;
    setCountry(country);

    const url = country === 'wordwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${country}`;
    const { data } = await axios.get(url);
    setCountryInfo(data);
  };

  //* Fetch wordwide info
  useEffect(() => {
    const getInfo = async () => {
      const { data } = await axios.get('https://disease.sh/v3/covid-19/all');
      setCountryInfo(data);
    };
    getInfo();
  }, []);

  //* Fetch all countries
  useEffect(() => {
    const getCountries = async () => {
      const { data } = await axios.get('https://disease.sh/v3/covid-19/countries');
      const sortedData = sortData(data);
      setCountries(sortedData);
    }
    getCountries();
  }, []);

  return (
    <div className="app">
      <div className="app__left">
        <div className="app__header">
          <h1>covid-19 tracker 💙</h1>

          <FormControl className="app__dropdown">
            <Select variant="outlined" value={country} onChange={handleChangeCountry}>
              <MenuItem value="wordwide">Wordwide</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.countryInfo.iso3} value={country.countryInfo.iso2}>{country.country}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        
        <div className="app__stats">
          <InfoBox title="Coronavirus cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>

        <Map />
      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Live Cases by Country</h3>
          <Table countries={countries} />

          <h3>Wordwide new cases</h3>
          <LineGraph />
        </CardContent>
      </Card>


    </div>
  );
}

export default App;