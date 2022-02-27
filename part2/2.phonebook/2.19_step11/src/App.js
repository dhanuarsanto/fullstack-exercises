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

const Notification = ({status,message}) => {
  if (!message) {
    return ''
  }
  
  return (
    <div className={status}>{message}</div>
    )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState('')
  
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
      if (!Number(newNumber)) {
        alert('number must be numeric')
        setNewNumber('')
      } else {
        const checkName = persons.find(person=>
          person.name.toLowerCase() === newName.toLowerCase())
        
        if (checkName) {
          const result = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)
          
          if (result) {
            const changeNumber = {...checkName,number:newNumber}
            
            personService
              .updateData(checkName.id,changeNumber)
              .then(returnedUpdate=>{
                setPersons(persons.map(person=>
                  person.id !== checkName.id
                  ? person
                  : returnedUpdate
                ))
                setNewName('')
                setNewNumber('')
                setMessage({
                  status:'success',
                  text:`Updated ${returnedUpdate.name}`
                })
                setTimeout(() => {setMessage('')}, 5000)
              })
          } else {
            console.log('update cancel')
          }
        } else {
          personService
            .createData(nameObject)
            .then(returnedCreate=>{
              setPersons(persons.concat(returnedCreate))
              setNewName('')
              setNewNumber('')
              setMessage({
                status:'success',
                text:`Added ${returnedCreate.name}`
              })
              setTimeout(() => {setMessage('')}, 5000)
            })
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
      const newPersons = persons.filter(p=>p.id !== id)
      personService
        .deleteData(id)
        .then(response=>{
          setPersons(newPersons)
          setNewName('')
          setNewNumber('')
          setMessage({
            status:'success',
            text:`${name} deleted`
          })
          setTimeout(() => {setMessage('')}, 5000);
        })
    } else {
      console.log(`${name} cancel deleted`)
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification status={message.status} message={message.text} />
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