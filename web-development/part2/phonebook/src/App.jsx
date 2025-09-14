import { Children, useEffect, useState } from 'react'
import './App.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import { Notification } from './components/Notification'
import { HttpStatusCode } from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])

  const [backup, setBackup] = useState([...persons])

  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchString, setSearchString] = useState('')

  const [isSuccesful, setIsSuccesful] = useState(false)
  const [currentContactName, setCurrentContactName] = useState('')
  const [actionType, setActionType] = useState('')

  const enableNotification = () => {
    setIsSuccesful(true)
    setTimeout(() => {
      setIsSuccesful(false)
    }, 2500);
  }

  useEffect(() => {
    getListContacts();
    return () => {
    }
  }, [])

  const refreshList = () => {
    getListContacts()
  }

  // API Method getAll()
  const getListContacts = () => {
    personService.getAll().then(response => {
      setPersons(response.data)
      setBackup(response.data)
    })
  }

  // API Method create(i)
  const addNewContact = (currentContact) => {
    setActionType('ACTION_ADD')
    personService.create(currentContact).then(response => {
      if (response.status === HttpStatusCode.Created) {
        enableNotification()
      }
    })
  }

  const updateContact = (id, currentContact) => {
    setActionType('ACTION_UPDATE')
    personService.update(id, currentContact).then(response => {
      if (response.status === HttpStatusCode.Ok) {
        enableNotification()
      }
    })
      .then(e => refreshList())
      .catch(error => {
        setActionType('ACTION_ERROR')
        enableNotification()
        refreshList()
      })

  }

  // ENDOF API Methods

  const handleSubmitForm = () => {
    event.preventDefault()
    const isNewNameOnPhonebook = persons.find(e => e.name.toLowerCase().trim() === newName.toLowerCase().trim())
    const isNewPhoneOnPhonebook = persons.find(e => e.number.trim() === newPhone.trim())
    const newId = Number(persons[persons.length - 1].id) + 1
    const currentContact = { name: newName, number: newPhone, id: newId.toString() }
    setCurrentContactName(newName);
    if (!isNewNameOnPhonebook && !isNewPhoneOnPhonebook) {

      const newArray = [...persons, currentContact]

      // send data to the state but adding the new contact info
      setPersons(newArray)

      addNewContact(currentContact)

      // update backup
      setBackup(newArray)

      // reset inputs
      setNewName('')
      setNewPhone('')

    } else {
      if (isNewPhoneOnPhonebook) {
        alert(`${newPhone} is already added to phonebook`)
      } else {
        if (isNewNameOnPhonebook) {
          const confirmation = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
          if (confirmation) {
            updateContact(isNewNameOnPhonebook.id, currentContact)
          }
        }
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
      {isSuccesful && <Notification actionType={actionType} currentContact={currentContactName} />}
      <Filter handleChangeSearchString={handleChangeSearchString} searchString={searchString} />
      <h3>Add a new</h3>
      <PersonForm newName={newName} newPhone={newPhone}
        handleChangeName={handleChangeName} handleChangePhone={handleChangePhone}
        handleChangeSearchString={handleChangeSearchString}
        handleSubmitForm={handleSubmitForm} />
      <h3>Numbers</h3>
      <Persons persons={persons} refresh={refreshList} enableNotification={enableNotification} setActionType={setActionType} />
    </div>
  )
}


export default App
