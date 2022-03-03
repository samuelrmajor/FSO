import { useState, useEffect } from 'react'
import personService from './services/persons'

const PersonForm = ({addContact, newName, handleNameChange, newNumber, handleNumberChange}) => {

  return(
    <form onSubmit ={addContact}>
        
        <div>
          name: <input
                  value = {newName}
                  onChange = {handleNameChange}
          />
          <br/>
          Number: <input 
                    value = {newNumber}
                    onChange ={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const Notification = ({ type, message }) => {

  

  if (message === null) {
    return null
  }
  else if (type === "error") {

   const styles = {
  color: "red",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}

  
  return (
    <div style = {styles}>
      {message}
    </div>
  )}

  else {
    const styles = {
  color: "green",
  background: "lightgrey",
  fontSize: 20,
  borderStyle: "solid",
  borderRadius: 5,
  padding: 10,
  marginBottom: 10
}
    return (
    <div style ={styles}>
      {message}
    </div>
  )
  }
}




const Filter = ({searchedName, handleSearchNameChange}) => {

  return (
    <div>
    filter: <input
                  value = {searchedName}
                  onChange = {handleSearchNameChange}
          />
    </div>
  )
}

const Deletebutton = ({deleteEntry}) => {

  return (
    <button onClick ={deleteEntry}>
      Delete
      </button>
  )
}

const Contact = ({deleteEntry, name, number}) => {
  return (
    <li>
      {name}: {number} <Deletebutton deleteEntry = {deleteEntry}/>
    </li>
  )

}







const App = () => {
  const [persons, setPersons] = useState([
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchedName, setSearchedName] = useState('')
  const [popupMessage, setPopupMessage] = useState(null)
  const [messageType, setMessageType] = useState(null)

  //retrieves data from server
  useEffect(() => {
    personService
      .getAll()
      .then(initialPeople => {
        setPersons(initialPeople)
      })
  }, [])


    //adds a new person to contact list.. if already there, dont
    const addContact = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber
    }
    if (persons.map(entry => entry.name).includes(newName)) {
      
      if(window.confirm(newName + " is already a contact. Update Number?" )){
        const person = persons.find(n => n.name === newName)
        const changedPerson = {...person, number: newNumber}
        personService
        .update(changedPerson.id, changedPerson)
        .then(returnedPerson => {
      setPersons(persons.map(person => person.id !== changedPerson.id ? person : returnedPerson))
      setNewName("")
      setNewNumber("")
      setPopupMessage(
          `Successfully updated!`
        )
        setMessageType(
          "success"
        )
        setTimeout(() => {
          setPopupMessage(null)
          setMessageType(null)
        }, 5000)
        }).catch( error => {
        console.log(error)
        //error.response.data.includes("'name'"))
          setPopupMessage(
          error.response.data.error
        )
        setMessageType(
          "error"
        )

        setTimeout(() => {
          setPopupMessage(null)
          setMessageType(null)
        }, 5000)
      }

      )}
        
      }

    else (
    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName("")
        setNewNumber("")
        setPopupMessage(
          `Successfully added!`
        )
        setMessageType(
          "success"
        )
        setTimeout(() => {
          setPopupMessage(null)
          setMessageType(null)
        }, 5000)
      }).catch( error => {
        console.log(error)
        //error.response.data.includes("'name'"))
          setPopupMessage(
          error.response.data.error
        )
        setMessageType(
          "error"
        )

        setTimeout(() => {
          setPopupMessage(null)
          setMessageType(null)
        }, 5000)
      }

      ))
  }

  const deleteContact = (id) => {

    if (window.confirm("Really Delete?")){
    personService
      .deletePerson(id)
      .then(() => {
        setPersons(persons.filter(n=> n.id !==id))
      }
      ).catch(error => {
        console.log(error)
        setPopupMessage(
          `Already removed from server!`
        )
        setMessageType(
          "error"
        )
        setPersons(persons.filter(n => n.id !== id))

        setTimeout(() => {
          setPopupMessage(null)
          setMessageType(null)
        }, 5000)})
    }
  }




  const handleNameChange = (event) =>{
    setNewName(event.target.value)
  }

   const handleSearchNameChange = (event) =>{
    setSearchedName(event.target.value)
  }

    const handleNumberChange = (event) =>{
    setNewNumber(event.target.value)

  }

    const personsToShow = searchedName === ""
      ? persons
      : persons.filter(person => person.name.toUpperCase().includes(searchedName.toUpperCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchedName = {searchedName} handleSearchNameChange = {handleSearchNameChange}/>
      <h2>Add A New</h2>
      
      <PersonForm addContact = {addContact} newName = {newName} handleNameChange ={handleNameChange} newNumber = {newNumber} handleNumberChange = {handleNumberChange}/>
      <h2>Numbers</h2>
      <Notification type ={messageType} message = {popupMessage} />
      <ul>
        {personsToShow.map(person =>
        <Contact deleteEntry = {()=>deleteContact(person.id)} key ={person.id} number = {person.number} name = {person.name}/>
      )}
      </ul>

      <div>debug: {newName}</div>
    </div>
  )
}

export default App