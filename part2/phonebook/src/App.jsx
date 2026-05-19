import { useState, useEffect } from 'react'

import { Filter, Persons, PersonForm } from './components/Person'
import { ErrorNotification, SuccessNotification } from './components/Notification'

import personService from './services/persons'

import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [sucessMessage, setSuccessMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personsFiltered = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))

  const addNumber = (event) => {
    event.preventDefault()
    if (persons.some((person) => person.name == newName)) {
      updateNumber(persons.find(p => p.name == newName))
      return
    }
    const person = { name: newName, number: newNumber }
    personService
      .create(person)
      .then(newPerson => {
        setPersons(persons.concat(newPerson))
        setSuccessMessage(`Added ${newPerson.name}.`)
        setTimeout(() => {
          setSuccessMessage(null)
        }, 5000)
      })
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = person => {
    if (window.confirm(`Delete ${person.name}?`))
      personService
        .deletePerson(person.id)
        .then(deleted => {
          setSuccessMessage(`Deleted ${person.name}.`)
          setTimeout(() => {
            setSuccessMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id != person.id))
        })
        .catch(error => {
          setErrorMessage(`The person ${person.name} was already deleted from the server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(p => p.id != person.id))
        })
  }

  const updateNumber = person => {
    if (window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)) {
      const changedPerson = { ...person, number: newNumber }
      personService
        .updatePerson(person.id, changedPerson)
        .then(returnedPerson =>
          setPersons(persons.map(p => p.id === person.id ? returnedPerson : p))
        )
        .catch(error => {
          setErrorMessage(`The person ${person.name} was already deleted from the server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      setNewName('')
      setNewNumber('')
    }
  }


  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorNotification message={errorMessage} />
      <SuccessNotification message={sucessMessage} />

      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>Add a new</h3>

      <PersonForm addNumber={addNumber}
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
      />

      <h2>Numbers</h2>

      <Persons persons={personsFiltered} deletePerson={deletePerson} />
    </div>
  )
}

export default App
