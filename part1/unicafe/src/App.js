import React, { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

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
      Good: {good} <br />
      Neutral: {neutral} <br />
      Bad: {bad} <br />
      
    </div>
  )
}

export default App