const Filter = (props) => {
    return (
        <div>
            filter numbers by name: <input value={props.searchInput} onChange={props.eventHandler}/>
        </div>
    )
}

export default Filter