import React from "react"

const Contacts = ({peopleToShow}) => {
    return (
      <div>
        <ul>
          {peopleToShow.map(person => <li key={person.name}>{person.name} {person.number}</li>)}
        </ul>
      </div>
    )
}

export default Contacts