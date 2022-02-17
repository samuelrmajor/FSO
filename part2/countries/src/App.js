import { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({searchedName, handleSearchNameChange}) => {

  return (
    <div>
    Filter: <input
                  value = {searchedName}
                  onChange = {handleSearchNameChange}
          />
    </div>

  )

}

const Button = ({country,handleShowButtonClick}) => (

  <button name = {country} onClick={(country)=>handleShowButtonClick({country})}>
    Show
  </button>

)

const Weather = ({weatherdata}) => {

  return (
    <div>
      your mom
    </div>

  )

}
const Country = ({country, handleShowButtonClick}) => {

  return (
    <div>
      {country} <Button handleShowButtonClick = {handleShowButtonClick} country = {country}/>
    </div>

  )

}


const Language = ({country}) => {

  return (
    <div>
      {country}
    </div>

  )

}

const Content = ({handleShowButtonClick, countries}) => {
  
  if (countries.length === 0){
  return (
    <div>
      None Found
    </div>
  )
}
  else if (countries[0].name.common === "United States Minor Outlying Islands") {
    return(
    <div>
      This country is bugged for some reason it makes no sense!
    </div>
    )
  }
  else if (countries.length=== 1){
    const languagesResult = countries[0].languages

    
    return(
      <div>
        <h2>{countries[0].name.common}</h2>
        Capitol: {countries[0].capital[0]}
        <br/>
        Area: {countries[0].area}
        <h2>
          Languages
        </h2>
        <div>
        {Object.values(languagesResult).map(
          language =>
      <Language key = {language} country = {language}/>
        )}
        <h2>
          Flag
        </h2>
      </div>
        <img src={countries[0].flags.png} alt="alternatetext"></img>
        


        


      </div>


    )
    }

  else if (countries.length <=10){
    return (
      <div>
        {countries.map(
          country =>
      <Country handleShowButtonClick = {handleShowButtonClick} key = {country.name.common} country = {country.name.common}/>
        )}
        
      </div>
    )
  }

  else {
    return(
    <div>
      Too Many Results
    </div>
    )
  }




}








const App = () => {
  const [countries, setCountries] = useState([
  ]) 

  const [searchedName, setSearchedName] = useState('')


  
  useEffect(() => {
  axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      setCountries(response.data)
      
    })
}, [])


  

  

   const handleSearchNameChange = (event) =>{
    setSearchedName(event.target.value)
  }

  const handleShowButtonClick = ({country}) =>{

    setSearchedName(country.target.name)
  }

    

    const countriesToShow = searchedName === ""
      ? countries
      : countries.filter(country => country.name.common.toUpperCase().includes(searchedName.toUpperCase()))


  return (
    <div>
      <h2>Countries</h2>
      <Filter searchedName = {searchedName} handleSearchNameChange = {handleSearchNameChange}/>
      
      <Content handleShowButtonClick = {handleShowButtonClick} countries = {countriesToShow}/>

      <div>debug: {searchedName}</div>
    </div>
  )
}

export default App