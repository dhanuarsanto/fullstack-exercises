import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({value,onchange}) =>
  <div>filter shown with <input value={value} onChange={onchange} /></div>

const PersonForm = ({onsubmit,inputName,onchangeName,inputNumber,onchangeNumber}) => {
  return (
    <div>
      <h3>Add a new</h3>
      <form onSubmit={onsubmit}>
        <div>
          name: <input value={inputName} onChange={onchangeName} />
        </div>
        <div>
          number: <input value={inputNumber} onChange={onchangeNumber} />
        </div>
        <div><button type="submit">add</button></div>
      </form>
    </div>
    )
}

const Persons = ({person,handle}) =>
  <div>
    {person.name} {person.number} <Button handle={handle} />
  </div>

const Button = ({handle}) =>
  <button onClick={handle}>delete</button>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  
  useEffect(() => {
    personService
      .getData()
      .then(initializePersons => setPersons(initializePersons))
  },[])
  
  const personShow = persons.filter(person=>
    person.name.toLowerCase().indexOf(newSearch.toLowerCase()) !== -1
  )
  
  const addName = (event) => {
    event.preventDefault()
    
    const nameObject = {name:newName,number:newNumber}
    
    if (newName === '' || newNumber === '') {
      alert('name or number cannot be empty')
    } else {
      const checkName = persons.find(person=>
        person.name.toLowerCase() === newName.toLowerCase())
      
      if (checkName) {
        alert(`${newName} is already added to phonebook`)
      } else {
        if (!Number(newNumber)) {
          alert('number must be numeric')
          setNewNumber('')
        } else {
          personService
            .create(nameObject)
            .then(returnedCreate=>
              setPersons(persons.concat(returnedCreate)))
          
          setNewName('')
          setNewNumber('')
        }
      }
    }
  }
  
  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleSearchChange = event => setNewSearch(event.target.value)
  const handleDelete = (id,name) => {
    const result = window.confirm(`delete ${name} ?`)
    if (result) {
      personService
        .deleteData(id)
        .then(response=>console.log(`${name} deleted`))
    } else {
      console.log(`${name} cancel deleted`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearch} onchange={handleSearchChange} />
      <PersonForm
        onsubmit={addName}
        inputName={newName}
        onchangeName={handleNameChange}
        inputNumber={newNumber}
        onchangeNumber={handleNumberChange}
      />
      <h3>Numbers</h3>
      {personShow.map(person=>
        <Persons
          key={person.id}
          person={person}
          handle={()=>handleDelete(person.id,person.name)}
        />
      )}
    </div>
  )
}

export default App