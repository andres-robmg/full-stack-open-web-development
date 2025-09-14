import React from 'react'
import personService from '../services/persons'

export const Person = ({ person, refresh, enableNotification, setActionType }) => {

  const handleClickDelete = ({ name, id }) => {
    const question = `Delete ${name}?`
    const confirmation = window.confirm(question)
    if (confirmation) {
      personService.delete(id)
        .then(e => {
          setActionType('ACTION_SUCCESS_DELETE')
          enableNotification()
        })
        .then(refresh)
        .catch(e => {
          setActionType('ACTION_ERROR_DELETE')
          enableNotification()
          refresh()
        })
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
