const SearchBar = ({ handleSearch }) => {
    return (
        <div>
            <span>find countries </span>
            <input onChange={handleSearch}/>
        </div>
    )
}

export default SearchBar