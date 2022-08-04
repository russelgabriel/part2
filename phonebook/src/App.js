import {useState, useEffect} from 'react'
import PersonForm from "./components/PersonForm"
import Filter from "./components/Filter"
import Contacts from './components/Contacts'
import phonebookService from './services/phonebook'

const App = () => {
  const [people, setPeople] = useState([])

  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchName, setSearchName] = useState("")
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    phonebookService
      .getAll()
      .then(initialContacts => {
        setPeople(initialContacts)
      })
  }, [])

  const peopleToShow = people.filter(person => 
    person.name.toLowerCase().includes(searchName.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }

    const found = people.find(person => 
      JSON.stringify(person.name) === JSON.stringify(personObject.name))


    if (found) {
      if (window.confirm(`${personObject.name} is already added to the phonebook. Would you like to edit this contact's number?`)) {
        phonebookService
          .update(found.id, personObject)
          .then(editedContact => {
            setPeople(people.map(person => person.id === editedContact.id ? editedContact : person))
            setNewName("")
            setNewNumber("")
            setNotification({
              message: `${personObject.name}'s number has been changed`, 
              type: "goodnotif"
            })
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
          .catch(error => {
            setNotification({
              message: `${personObject.name} has already been removed from the server`, 
              type: "badnotif"
            })
            setPeople(people.filter(person => person.name !== personObject.name))
            setTimeout(() => {
              setNotification(null)
            }, 5000)
          })
      }
    } else {
      phonebookService
        .create(personObject)
        .then( newPerson => {
          setPeople(people.concat(newPerson))
          setNewName("")
          setNewNumber("")   
          setNotification({
            message: `Added ${personObject.name}`, 
            type: "goodnotif"
          })
        })
        .catch(error => {
          console.log(error.response.data.error);
          setNotification({
            message: error.response.data.error,
            type: "badnotif"
          })
        })
        setTimeout(() => setNotification(null), 5000)  
    }
  }

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      phonebookService
        .del(person.id)
        .then(response => {
          setPeople(people.filter(contact => contact.id !== person.id))
        })
    }
  }

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchNameChange = (event) => {
    setSearchName(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <PersonForm addPerson={addPerson} newName={newName} 
      handleNewNameChange={handleNewNameChange} newNumber={newNumber} 
      handleNewNumberChange={handleNewNumberChange} />
      <h2>Numbers</h2>
      <Filter searchName={searchName} handleSearchNameChange={handleSearchNameChange} />
      <Contacts peopleToShow={peopleToShow} handleClick={deletePerson}/>
    </div>
  )
}

const Notification = ({notification}) => {
  if (notification === null) {
    return (
      <div></div>
    )
  }

  return (
    <div className={notification.type}>
      {notification.message}
    </div>
  )
}

export default App