import React from "react"

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

export default PersonForm