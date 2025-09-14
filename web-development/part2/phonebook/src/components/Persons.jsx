import { Person } from "./Person"

const Persons = ({ persons, refresh, enableNotification, setActionType }) => {
  return (
    <div>
      <ul>
        {persons.map(person => <Person key={person.name} person={person} refresh={refresh} enableNotification={enableNotification} setActionType={setActionType}/>)}
      </ul>
    </div>
  )
}

export default Persons