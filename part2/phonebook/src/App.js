import { useState } from 'react'


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

const Contacts = ({personsToShow}) => {
return(
  <ul>
        {personsToShow.map(person =>
        <Contact key ={person.name} number = {person.number} name = {person.name}/>
      )}
      </ul>
)

}

const Contact = ({name, number}) => {
  return (
    <li>
      {name}: {number}
    </li>
  )

}







const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: "6782742593" }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchedName, setSearchedName] = useState('')

  const addContact = (event) =>{
    
    event.preventDefault()
    const nameObject = {
      name: newName,
      number: newNumber
    }
    if (persons.map(entry => entry.name).includes(newName)){
      window.alert(newName + " is already a contact")
      setNewName("")
      setNewNumber("")
    }
    else {
    setPersons(persons.concat(nameObject))
    setNewName("")
    setNewNumber("")
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

    const personsToShow = searchedName == ""
      ? persons
      : persons.filter(person => person.name.toUpperCase().includes(searchedName.toUpperCase()))


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchedName = {searchedName} handleSearchNameChange = {handleSearchNameChange}/>
      <h2>Add A New</h2>
      <PersonForm addContact = {addContact} newName = {newName} handleNameChange ={handleNameChange} newNumber = {newNumber} handleNumberChange = {handleNumberChange}/>
      <h2>Numbers</h2>
      <Contacts personsToShow = {personsToShow}/>
      <div>debug: {newName}</div>
    </div>
  )
}

export default App