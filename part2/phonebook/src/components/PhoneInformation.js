const Row = ({ person }) => {

    return (
    <tr>
        <td>{person.name}</td>
        <td>{person.number}</td>
    </tr>
    )
}

const PhoneInformation = ({ persons }) => {
    
    const rows = persons.map((person) => <Row key={person.name} person={person} />)

    if (rows.length === 0) return <p>The phonebook is empty!</p>;

    return (
        <div>
            <table>
                {rows}
            </table>
        </div>
    )
}

export default PhoneInformation