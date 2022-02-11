import React, { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({bad,neutral,good}) => {

  return (
    <div>
      Good: {good} <br />
      Neutral: {neutral} <br />
      Bad: {bad} <br />
      All: {neutral+bad+good} <br />
      Average: {(good-bad)/(good+bad+neutral)} <br />
      Good: {good/(good+bad+neutral)} <br />
    </div>
  )


}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseGood =() => setGood(good+1)
  const increaseNeutral =() => setNeutral(neutral+1)
  const increaseBad =() => setBad(bad+1)

  return (
    <div>
      <h1>
        Give Feedback
      </h1>
      <Button text = "Good" handleClick = {increaseGood}/>
      <Button text = "Neutral" handleClick = {increaseNeutral}/>
      <Button text = "Bad" handleClick = {increaseBad}/>
      <h1>
        Statistics:
      </h1>
        <Statistics good = {good} bad ={bad} neutral = {neutral}/>
      
    </div>
  )
}

export default App