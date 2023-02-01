import SingleCountry from "./SingleCountry";

const Countries = ({ countryData, searchQuery, handleShow }) => {

    if (searchQuery === null || searchQuery === '') return <p>Start typing a country to begin the search!</p>

    const filteredCountryObjects = countryData.filter(countryObject => countryObject.name.common.toLowerCase().includes(searchQuery))
    if (filteredCountryObjects.length > 10) return <p>Too many matches, specify another filter</p>;
    if (filteredCountryObjects.length === 0) return <p>No countries found</p>
    if (filteredCountryObjects.length === 1) {
        return <SingleCountry countryObject={filteredCountryObjects[0]} />
    }

    return (
        <table>
            <tbody>
                {filteredCountryObjects.map(countryObject => {
                    return (<tr key={countryObject.name.common}>
                                <td>{countryObject.name.common}</td>
                                <td><button onClick={() => handleShow(countryObject)}>show</button></td>
                            </tr>)
                })
                }
            </tbody>
        </table>
    )
}

export default Countries;