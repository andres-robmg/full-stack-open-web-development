import { Person } from "./Person"

const Persons = ({ persons, refresh }) => {
  return (
    <div>
      <ul>
        {persons.map(person => <Person key={person.name} person={person} refresh={refresh}/>)}
      </ul>
    </div>
  )
}

export default Persons