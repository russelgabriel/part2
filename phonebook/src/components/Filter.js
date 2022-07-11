import React from 'react'

const Filter = ({searchName, handleSearchNameChange}) => {
    return (
        <div>
            search <input value={searchName} onChange={handleSearchNameChange}/>
        </div>
    )
}

export default Filter