import Weather from "./Weather";

const SingleCountry = ({ countryObject }) => {
    const languagesObject = countryObject.languages
    const languages = Object.keys(languagesObject).map((objectKey) => <li key={languagesObject[objectKey]}>{languagesObject[objectKey]} </li>);

    return(
        <div>
            <h1>{countryObject.name.common}</h1>
            <table>
                <tbody>
                    <tr>
                        <td>capital</td>
                        <td>{countryObject.capital[0]}</td>
                    </tr>
                    <tr>
                        <td>area</td>
                        <td>{countryObject.area}</td>
                    </tr>
                </tbody>
            </table>
            
            <h2>languages:</h2>
            <ul>
                {languages}
            </ul>
            <img src={countryObject.flags.png} alt='flag'/>
            <Weather countryObject={countryObject} />
        </div>
    )
}

export default SingleCountry;