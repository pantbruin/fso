/* eslint-disable no-lone-blocks */
import { useState, useEffect } from 'react'
import PhoneInformation from './components/PhoneInformation';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import personsService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([]);

  {/* newInput controls the search input field's current value */ }
  const [searchInput, setSearchInput] = useState('');

  {/* newInput controls the form's input fields current value */ }
  const [newInput, setNewInput] = useState({
     name: '',
     number: ''
  })

  useEffect(() => {
    personsService.getAll()
      .then(persons => setPersons(persons))
  }, [])

  {/* handleNewInput is an event handler that gets executed every time any of the input fields
    of the form change. When the input field changes, the current value of the field gets stored in the newInput object state/hook */ }
  const handleNewInput = (event) => {
    const updatedState = {...newInput};
    updatedState[event.target.name] = event.target.value;

    setNewInput(updatedState);
  }

  {/* handleNewInput is an event handler that gets executed every time the user submits a new name and phone number to add
  to the phone book. A new name should only be added if it doesn't already exist. This is verified by checking the persons state variable */ }
  const handleSubmit = (event) => {
    event.preventDefault();

    const newPerson = {
      name: newInput.name,
      number: newInput.number
    }

    // If the person already exists in the phone book, then we should confirm if the client wants to update the phone number
    const foundPerson = persons.find(element => element.name === newInput.name);

    if (foundPerson) {
      if(!(window.confirm(`${newInput.name} is already added to the phonebook, replace the old number with the new one?`))) {
        setNewInput({
          ...newInput,
          name: ''
        });
        return;
      }

      // PUT request
      const id = foundPerson.id;
      personsService.update(id, newPerson)
        .then(responseData => {
          setPersons(persons.map(ele => {
            return ele.id !== responseData.id ? ele : responseData
          }))
        })
        .then(() => {
          // Clear the controlled input fields
          setNewInput({
            name: '',
            number: ''
          });
        })

    } else {

      // POST request
      personsService.create(newPerson)
      .then(person => setPersons(persons.concat(person)))
      .then(() => {
        // Clear the controlled input fields
        setNewInput({
          name: '',
          number: ''
        });
      })
      }


  }

  const handleSearch = (event) => {
    setSearchInput(event.target.value);
  }

  const handleDelete = person => {
    if (!(window.confirm(`Delete ${person.name}?`))) return;

    personsService.deletePerson(person.id)
      .then(() => setPersons(persons.filter( element => element.id !== person.id)))
      .catch(console.log)
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter value={searchInput} eventHandler={handleSearch}/>
      <h2>Add a new person to phonebook</h2>
      <PersonForm name={newInput.name} number={newInput.number} handleNewInput={handleNewInput} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <PhoneInformation persons={persons} searchInput={searchInput} handleDelete={handleDelete}/>
    </div>
  )
}

export default App