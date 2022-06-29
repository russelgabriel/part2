import {useState} from 'react'

const App = () => {
  const [people, setPeople] = useState([
    {name: "Russel Sy"}
  ])

  const [newName, setNewName] = useState("")

  const addName = (event) => {
    event.preventDefault()
    const newPerson = {
      name: newName
    }

    const found = people.find(person => JSON.stringify(person) === JSON.stringify(newPerson))

    if (found) {
      alert(`${newPerson.name} is already added to phonebook`)
    } else {
      setPeople(people.concat(newPerson))
      setNewName("")      
    }
  }


  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }
  
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNewNameChange}/>
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {people.map(person => <li key={person.name}>{person.name}</li>)}
      </ul>
    </div>
  )
}

export default App