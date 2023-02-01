import SearchBar from "./components/SearchBar";
import Countries from "./components/Countries";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  const [searchQuery, setSearchQuery] = useState(null);
  const [countryData, setCountryData] = useState(null);

  // Only need to get the country data once. As the user changes the search query, we search the country data state var
  useEffect(() => {
      axios.get('https://restcountries.com/v3.1/all')
        .then(res => res.data)
        .then(data => setCountryData(data))
  }, [])

  const handleSearch = ({ target }) => {
    setSearchQuery(target.value.toLowerCase());
  }

  const handleShow = (countryObject) => {
    setSearchQuery(countryObject.name.common.toLowerCase())
  }

  // Wait until useEffect runs for the first time 
  if (countryData === null) return null;

  return (
    <div className="App">
    <SearchBar handleSearch={handleSearch}/>
    <Countries countryData={countryData} searchQuery={searchQuery} handleShow={handleShow}/>
    </div>
  );
}

export default App;
