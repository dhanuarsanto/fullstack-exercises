import { useState } from 'react'

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