const Filter = (props) => {
  return <div>
    filter: <input value={props.filter} onChange={props.handleFilterChange} />
  </div>
}

const Person = ({ person, deletePerson }) =>
  <div>
    {person.name} {person.number} <button onClick={() => { deletePerson(person) }}> delete </button>
  </div>

const Persons = ({ persons, deletePerson }) =>
  persons.map(person => <Person key={person.id} person={person} deletePerson={deletePerson} />)

const PersonForm = (props) =>
  <form onSubmit={props.addNumber}>
    <div>
      name: <input value={props.newName} onChange={props.handleNameChange} />
    </div>
    <div>
      number: <input value={props.newNumber} onChange={props.handleNumberChange} />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>

export { Filter, Persons, PersonForm } 
