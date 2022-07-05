import {useState, useEffect} from 'react'
import axios from 'axios'

const App = () => {
  const [people, setPeople] = useState([])

  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchName, setSearchName] = useState("")

  useEffect(() => {
    console.log("effect");
    axios
      .get("http://localhost:3001/people")
      .then(response => {
        console.log("promise fulfilled");
        setPeople(response.data)
      })
  }, [])
  console.log("rendering", people.length, "contacts");

  const peopleToShow = people.filter(person => 
    person.name.toLowerCase().includes(searchName.toLowerCase()))

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName,
      number: newNumber
    }

    const found = people.find(person => 
      JSON.stringify(person.name) === JSON.stringify(newPerson.name))

    if (found) {
      alert(`${newPerson.name} is already added to phonebook`)
    } else {
      setPeople(people.concat(newPerson))
      setNewName("")
      setNewNumber("")      
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
      <PersonForm addPerson={addPerson} newName={newName} 
      handleNewNameChange={handleNewNameChange} newNumber={newNumber} 
      handleNewNumberChange={handleNewNumberChange} />
      <h2>Numbers</h2>
      <Filter searchName={searchName} handleSearchNameChange={handleSearchNameChange} />
      <Contacts peopleToShow={peopleToShow} />
    </div>
  )
}

const PersonForm = ({addPerson, newName, handleNewNameChange, newNumber, handleNewNumberChange}) => {
  return (
    <div>
      <h3>Add new Contact</h3>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumberChange}/>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
    </div>
  )
}

const Filter = ({searchName, handleSearchNameChange}) => {
  return (
    <div>
      search <input value={searchName} onChange={handleSearchNameChange}/>
    </div>
  )
}

const Contacts = ({peopleToShow}) => {
  return (
    <div>
      <ul>
        {peopleToShow.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App