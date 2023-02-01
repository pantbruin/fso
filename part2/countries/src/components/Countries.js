import SingleCountry from "./SingleCountry";

const Countries = ({ countryData, searchQuery }) => {

    if (searchQuery === null || searchQuery === '') return <p>Start typing a country to begin the search!</p>

    const filteredCountries = countryData.filter(countryObject => countryObject.name.common.toLowerCase().includes(searchQuery))
    if (filteredCountries.length > 10) return <p>Too many matches, specify another filter</p>;
    if (filteredCountries.length === 0) return <p>No countries found</p>
    if (filteredCountries.length === 1) {
        return <SingleCountry countryObject={filteredCountries[0]} />
    }

    const countryNames = filteredCountries.map((countryObject) => countryObject.name.common)

    return (
        <table>
            <tbody>
                {countryNames.map(name => <tr key={name}><td>{name}</td></tr>)}
            </tbody>
        </table>
    )
}

export default Countries;