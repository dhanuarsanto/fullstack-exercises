import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [newName, setNewName] = useState('new name')
  const [newNumber, setNewNumber] = useState('')
  
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {name: newName, number:newNumber}
    newName === '' || newNumber === ''
    ? alert('name or number cannot be empty')
    : persons.find(person=>person.name.toLowerCase() === newName.toLowerCase())
      ? alert(`${newName} is already added to phonebook`)
      : !Number(newNumber)
        ? alert('number must be numeric')
        : setPersons(persons.concat(nameObject))
    setNewName('')
    setNewNumber('')
  }
  
  const handleNameChange = event => setNewName(event.target.value)
  
  const handleNumberChange = event => setNewNumber(event.target.value)
  
  console.log(persons)

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName} >
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map(person=><div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App