import SearchBar from "./components/SearchBar";
import Countries from "./components/Countries";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [searchQuery, setSearchQuery] = useState(null);
  const [countryData, setCountryData] = useState(null);

  useEffect(() => {
      axios.get('https://restcountries.com/v3.1/all')
        .then(res => res.data)
        .then(data => setCountryData(data))
  }, [])

  const handleSearch = ({ target }) => {
    setSearchQuery(target.value);
  }

  if (countryData === null) return null;

  return (
    <div className="App">
    <SearchBar handleSearch={handleSearch}/>
    <Countries countryData={countryData} searchQuery={searchQuery}/>
    </div>
  );
}

export default App;
