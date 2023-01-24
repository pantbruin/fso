const PersonForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                name: <input name='name' value={props.name} onChange={props.handleNewInput}/>
            </div>
            <div>
                number: <input name='number' value={props.number} onChange={props.handleNewInput}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
      </form>
    )
}

export default PersonForm