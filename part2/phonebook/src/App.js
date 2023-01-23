import { useState } from 'react'
import PhoneInformation from './components/PhoneInformation'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNewName = (event) => {
    setNewName(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const personExists = persons.some((element) => element.name === newName)

    if (personExists) {
      alert(`${newName} is already added to the phonebook`)
      setNewName('');
      return;
    }

    const newPerson = {
      name: newName,
    }
    setPersons(persons.concat(newPerson));
    setNewName('');
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PhoneInformation persons={persons} />
    </div>
  )
}

export default App