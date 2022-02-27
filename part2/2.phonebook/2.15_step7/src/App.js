import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({value,onchange}) =>
  <>filter shown with <input value={value} onChange={onchange} /></>

const PersonForm = ({onsubmit,inputName,onchangeName,inputNumber,onchangeNumber}) => {
  return (
    <>
      <form onSubmit={onsubmit}>
        <div>
          name: <input value={inputName} onChange={onchangeName} />
        </div>
        <div>
          number: <input value={inputNumber} onChange={onchangeNumber} />
        </div>
        <div><button type="submit">add</button></div>
      </form>
    </>
    )
}

const Persons = ({personShow}) =>
  <>
    {personShow.map(person=>
      <div key={person.id}>{person.name} {person.number}</div>
    )}
  </>

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  
  const hook = () =>
    axios
      .get('http://localhost:3001/persons')
      .then(response=>setPersons(response.data))
  
  useEffect(hook, [])
  
  const personShow = persons.filter(person=>
    person.name.toLowerCase().indexOf(newSearch.toLowerCase()) !== -1
  )
  
  const addName = (event) => {
    event.preventDefault()
    
    const url = 'http://localhost:3001/persons'
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
          axios
          .post(url,nameObject)
          .then(response=>setPersons(persons.concat(response.data)))
          
          setNewName('')
          setNewNumber('')
        }
      }
    }
  }
  
  const handleNameChange = event => setNewName(event.target.value)
  const handleNumberChange = event => setNewNumber(event.target.value)
  const handleSearchChange = event => setNewSearch(event.target.value)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={newSearch} onchange={handleSearchChange} />
      <h3>Add a new</h3>
      <PersonForm
        onsubmit={addName}
        inputName={newName}
        onchangeName={handleNameChange}
        inputNumber={newNumber}
        onchangeNumber={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons personShow={personShow} />
    </div>
  )
}

export default App