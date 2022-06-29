import {useState} from 'react'

const App = () => {
  const [people, setPeople] = useState([
    {name: "Russel Sy", number: "646-787-5397", id: 0},
    {name: "Johnny Sins", number: "123456789", id: 1}, 
    {name: "Mia Khalifa", number: "987654321", id: 2}
  ])

  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [searchName, setSearchName] = useState("")

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
      <h3>Add new Person</h3>
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
      <h2>Numbers</h2>
      <div>
        search <input value={searchName} onChange={handleSearchNameChange}/>
      </div>
      <ul>
        {peopleToShow.map(person => <li key={person.id}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App