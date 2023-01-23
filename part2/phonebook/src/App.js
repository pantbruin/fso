import { useState } from 'react'
import PhoneInformation from './components/PhoneInformation'

const App = () => {
  const [persons, setPersons] = useState([]);

  {/* newInput controls the search input field's current value */ }
  const [searchInput, setSearchInput] = useState('');

  {/* newInput controls the form's input fields current value */ }
  const [newInput, setNewInput] = useState({
     name: '',
     phone: ''
  })

  {/* handleNewInput is an event handler that gets executed every time any of the input fields
    of the form change. When the input field changes, the current value of the field gets stored in the newInput object state/hook */ }
  const handleNewInput = (event) => {
    const updatedState = {...newInput};
    updatedState[event.target.name] = event.target.value;

    setNewInput(updatedState);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const personExistsInPhoneBook = persons.some((element) => element.name === newInput.name)
    if (personExistsInPhoneBook) {
      alert(`${newInput.name} is already added to the phonebook`)
      setNewInput({
        ...newInput,
        name: ''
      });
      return;

    } else {
      const newPerson = {
        name: newInput.name,
        number: newInput.number
      }
      setPersons(persons.concat(newPerson));
      setNewInput({
        name: '',
        number: ''
      });
    }
  }

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
          filter numbers by name: <input value={searchInput} onChange={handleSearch}/>
        </div>
      <h2>Add a new person to phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input name='name' value={newInput.name} onChange={handleNewInput}/>
        </div>
        <div>
          number: <input name='number' value={newInput.number} onChange={handleNewInput}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PhoneInformation persons={persons} searchInput={searchInput} />
    </div>
  )
}

export default App