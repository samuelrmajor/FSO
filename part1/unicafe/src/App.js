import React, { useState } from 'react'


const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({bad,neutral,good}) => {

  if (bad + neutral + good === 0) 
  return (
    <div>
      No Feedback Given
    </div>
  )

  return (
    <div>
      <table>
        <tbody>
            <StatisticLine text = "Good" value = {good}/>
            <StatisticLine text = "Neutral" value = {neutral} />
            <StatisticLine text = "Bad" value = {bad} />
            <StatisticLine text = "All" value = {neutral+bad+good} />
            <StatisticLine text = "Average" value = {(good-bad)/(good+bad+neutral)} />
            <StatisticLine text = "Positive" value = {100*good/(good+bad+neutral)} nopercent = {false}/>
        </tbody>
      </table> 
    </div>
  )


}

const StatisticLine = ({value, text, nopercent = true}) => {

if (nopercent)
return (
  
    <tr>
      <td>{text}</td>
      <td>{Math.round(value * 10) / 10}</td>
    </tr>
  )

return (
    <tr>
      <td>{text}</td>
      <td>{Math.round(value * 10) / 10} %</td>
    </tr>
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