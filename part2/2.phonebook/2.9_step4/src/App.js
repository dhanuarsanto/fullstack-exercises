import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('new name')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  
  const personShow = persons.filter(person=>
    person.name.toLowerCase().indexOf(newSearch.toLowerCase()) !== -1
  )
  
  const addName = (event) => {
    event.preventDefault()
    const nameObject = {name:newName, number:newNumber, id:persons.length+1}
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
  
  const handleSearchChange = event => setNewSearch(event.target.value)
  
  console.log(persons)

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={newSearch} onChange={handleSearchChange} />
      </div>
      <h2>add a new</h2>
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
      {personShow.map(person=><div key={person.id}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App