import React from "react"

const Contacts = ({peopleToShow, handleClick}) => {
    return (
      <div>
        <ul>
          {peopleToShow.map(person => 
            <li key={person.name}>
              {person.name} {person.number}
              <button onClick={() => handleClick(person)} >delete</button>
            </li>)}
        </ul>
      </div>
    )
}

export default Contacts