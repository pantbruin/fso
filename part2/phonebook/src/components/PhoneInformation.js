const Row = ({ name }) => {

    return (
    <tr>
        <td>{name}</td>
    </tr>
    )
}

const PhoneInformation = ({ persons }) => {
    const rows = persons.map((element) => <Row key={element.name} name={element.name} />)
    return (
        <div>
            <table>
                {rows}
            </table>
        </div>
    )
}

export default PhoneInformation