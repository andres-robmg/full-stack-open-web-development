import { useState } from 'react'
import './App.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])

  const [backup, setBackup] = useState([...persons])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchString, setSearchString] = useState('')

  const handleSubmitForm = () => {
    event.preventDefault()
    const isNewNameOnPhonebook = persons.find(e => e.name.toLowerCase().trim() === newName.toLowerCase().trim())
    const isNewPhoneOnPhonebook = persons.find(e => e.number.trim() === newPhone.trim())

    if (!isNewNameOnPhonebook && !isNewPhoneOnPhonebook) {
      const newId = persons.length + 1
      const newArray = [...persons, { name: newName, number: newPhone, id: newId }]
      setPersons(newArray)
      setBackup(newArray)
      setNewName('')
      setNewPhone('')
    } else {
      if (isNewPhoneOnPhonebook) {
        alert(`${newPhone} is already added to phonebook`)
      }
      if (isNewNameOnPhonebook) {
        alert(`${newName} is already added to phonebook`)
      }
    }
  }

  const handleChangeName = (e) => {
    setNewName(e)
  }

  const handleChangePhone = (e) => {
    setNewPhone(e)
  }

  const handleChangeSearchString = (e) => {
    setSearchString(e)
    filterPhoneBook(e)
  }

  const filterPhoneBook = (e) => {
    if (e === '') {
      setPersons(backup)
    } else {
      const filterByString = backup.filter(
        e => e.name.toLowerCase().trim().includes(searchString.toLowerCase().trim())
      );
      setPersons(filterByString);
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChangeSearchString={handleChangeSearchString} searchString={searchString} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} newPhone={newPhone}
        handleChangeName={handleChangeName} handleChangePhone={handleChangePhone}
        handleChangeSearchString={handleChangeSearchString}
        handleSubmitForm={handleSubmitForm} />
      <h3>Numbers</h3>
      <Persons persons={persons} />
    </div>
  )
}


export default App
