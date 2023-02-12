/* eslint-disable no-lone-blocks */
import { useState, useEffect } from 'react'
import PhoneInformation from './components/PhoneInformation';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Notification from './components/Notification';

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

  const [notificationMessage, setNotificationMessage] = useState(null);

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
        // User cancelled update, reset input fields and return
        setNewInput({
          name: '',
          number: ''
        });
        return;
      }

      // User is choosing to update existing persons number, execute PUT request
      const id = foundPerson.id;
      personsService.update(id, newPerson)
        .then(responseData => {
          setPersons(persons.map(ele => {
            return ele.id !== responseData.id ? ele : responseData
          }))
          return responseData;
        })
        .then((responseData) => {
          // Display notification message by setting the state.
          setNotificationMessage(`${responseData.name}'s number was successfully updated`);
          
          // Set a timer to clear the notification message after 5 seconds
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);
        })
        .then(() => {
          // Clear the controlled input fields
          setNewInput({
            name: '',
            number: ''
          });
        })
        .catch((error) => {
          setNotificationMessage(`${foundPerson.name} has already been removed from the server`);

          // Clear the controlled input field
          setNewInput({
            name: '',
            number: ''
          });

          // Set a timer to clear the notification message after 5 seconds
          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000);

          // re-render the component
          setPersons(persons.filter( element => element.id !== foundPerson.id))
        })

    } else {

      // POST request
      personsService.create(newPerson)
        .then(response => {
          setPersons(persons.concat(response))
          return response;
        })
        .then((response) => {
          setNotificationMessage(`${response.name} successfully added`)

          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000)
        })
        .then(() => {
          // Clear the controlled input fields
          setNewInput({
            name: '',
            number: ''
          });
        })
        .catch(error => {
          setNotificationMessage(error.response.data.error);

          setTimeout(() => {
            setNotificationMessage(null);
          }, 5000)
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
      <Notification message={notificationMessage} />
      <Filter value={searchInput} eventHandler={handleSearch}/>
      <h2>Add a new person to phonebook</h2>
      <PersonForm name={newInput.name} number={newInput.number} handleNewInput={handleNewInput} handleSubmit={handleSubmit} />
      <h2>Numbers</h2>
      <PhoneInformation persons={persons} searchInput={searchInput} handleDelete={handleDelete}/>
    </div>
  )
}

export default App