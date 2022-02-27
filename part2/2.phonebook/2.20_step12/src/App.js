import { useState, useEffect } from 'react'
import personService from './services/persons'

const Filter = ({value,onchange}) =>
  <div>filter shown with <input value={value} onChange={onchange} /></div>

const PersonForm = ({addContact,contact,handle}) => {
  return (
    <div>
      <h3>Add a new</h3>
      <form onSubmit={addContact}>
        <div>
          name: <input value={contact.name} onChange={handle} name='name' />
        </div>
        <div>
          number: <input value={contact.number} onChange={handle} name='number' />
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
  const [contactPerson, setContactPerson] = useState({name:'',number:''})
  const [newSearch, setNewSearch] = useState('')
  const [message, setMessage] = useState('')
  
  useEffect(() => {
    personService
      .getData()
      .then(initializePersons => {
        setPersons(initializePersons)
        setMessage({
          status:'success',
          text:'server is running up'
        })
      })
      .catch(error => {
        setMessage({
          status:'error',
          text:'communicated with server error'
        })
      })
    setTimeout(()=>{setMessage('')}, 5000)
  },[])
  
  const personShow = persons.filter(person=>
    person.name.toLowerCase().indexOf(newSearch.toLowerCase()) !== -1
  )
  
  const addName = (event) => {
    event.preventDefault()
    const name = contactPerson.name
    const number = contactPerson.number
    const checkName = persons.find(p => p.name === name)
    const defaultContact = {name:'',number:''}
    
    if (name === '' || number === '') {
      return alert('name and number cannot be empty')
    }
    
    if (!Number(number)) {
      setContactPerson({...defaultContact,name:name})
      return alert('number must be numeric')
    }
    
    personService
      .getData()
      .then(initializeData => {
        const checkData = initializeData.find(p => p.name === name)
        if (checkName && checkData === undefined) {
          const confirm = window.confirm(`'${name}' is already added to phonebook, replace the old number with a new one`)
          if (confirm) {
            setPersons(initializeData)
            setMessage({
              status:'error',
              text:`'${name}' has been remove from server`
            })
          }
          return console.log(`'${name}' has been remove from server`)
        }
        if (checkName === undefined && checkData) {
          setPersons(initializeData)
          setMessage({
            status:'error',
            text:`'${name}' already on the server`
          })
          return console.log(`'${name}' already on the server`)
        }
        if (checkName !== undefined && checkData !== undefined) {
          const confirm = window.confirm(`'${name}' is already added to phonebook, replace the old number with a new one`)
          if (confirm) {
            const change = {...checkData, number:number}
            personService
              .updateData(checkName.id,change)
              .then(returnedUpdate => {
                setPersons(initializeData.map(person =>
                  person.id === checkData.id ? returnedUpdate : person
                ))
                setContactPerson(defaultContact)
                setMessage({
                  status:'success',
                  text:`'${name}' updated`
                })
              })
              .catch(error => {
                setMessage({
                  status:'error',
                  text:`'${name}' has been remove or communicated with server error, please reload your browser`
                })
              })
          }
          return console.log('update data')
        }
        if (checkName === checkData) {
          const newData = {name:name,number:number}
          personService
            .createData(newData)
            .then(returnedCreate => {
              setPersons(initializeData.concat(returnedCreate))
              setContactPerson(defaultContact)
              setMessage({
                status:'success',
                text:`'${name}' added`
              })
            })
          return console.log('create data')
        }
      })
      .catch(error => {
        setMessage({
          status:'error',
          text:'communicated with server error '
        })
        return console.log('communicated with server error ')
      })
    setTimeout(() => setMessage(''), 5000)
  }
  
  const handleInputChange = (event) => {
    const key = event.target.name
    const value = event.target.value
    setContactPerson({...contactPerson,[key]:value})
  }
  
  const handleSearchChange = event => setNewSearch(event.target.value)
  
  const handleDelete = (id,name) => {
    const result = window.confirm(`delete ${name} ?`)
    if (result) {
      personService
        .getData()
        .then(initializeData => {
          const newPersons = initializeData.filter(p => p.id !== id)
          personService
            .deleteData(id)
            .then(response => {
              setMessage({
                status:'success',
                text:`${name} deleted`
              })
            })
            .catch(error=>{
              setMessage({
                status:'error',
                text:`'${name}' already remove from server`
              })
            })
          setPersons(newPersons)
          setTimeout(() => {setMessage('')}, 5000)
        })
    }
  }
  
  const noData = persons.length === 0 ? 'no data found' : ''
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification status={message.status} message={message.text} />
      <Filter value={newSearch} onchange={handleSearchChange} />
      <PersonForm addContact={addName} contact={contactPerson} handle={handleInputChange} />
      <h3>Numbers</h3>
      {noData}
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