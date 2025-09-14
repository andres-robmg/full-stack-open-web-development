import React from 'react'
import personService from '../services/persons'

export const Person = ({ person, refresh }) => {

  const handleClickDelete = ({ name, id }) => {
    const question = `Delete ${name}?`
    const confirmation = window.confirm(question)
    if (confirmation) {
      personService.delete(id).then(refresh)
    }
  }

  return (
    <div>
      <li key={`${person.name}`}>
        <div>{`${person.name} ${person.number}`}
          <button onClick={() => handleClickDelete(person)}>delete</button>
        </div>
      </li>
    </div>
  )
}
