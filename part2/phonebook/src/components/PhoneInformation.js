const Row = ({ person, handleDelete }) => {

    return (
    <tr>
        <td>{person.name}</td>
        <td>{person.number}</td>
        <td><button onClick={() => {handleDelete(person)}}>remove</button></td>
    </tr>
    )
}

const PhoneInformation = (props) => {

    let persons = props.persons;

    {/* If the searchInput state (a controlled input field) is not an empty string, then that means the user is attempting to search. Filter the results
    to include only the persons that includes the substring of the search string */}
    if (props.searchInput.length !== 0){ 
        persons = persons.filter((person) => {
            return person.name.toLowerCase().includes(props.searchInput)
        })
    }

    const rows = persons.map((person) => <Row key={person.name} person={person} handleDelete={props.handleDelete}/>)

    if (rows.length === 0) return <p>No entries found!</p>;

    return (
        <div>
            <table>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    )
}

export default PhoneInformation