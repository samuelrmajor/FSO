import React, { useState } from 'react'





const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Popanec = ({popularAnecdote,anecdotes,votes}) => {
  if (popularAnecdote == -1)
    return (
      <div>
      <h1>
        Current Popular Header:
      </h1>
        No Votes have been cast
      </div>

    )
  return (
      <div>
      <h1>
        Current Popular Header:
      </h1>
        {anecdotes[popularAnecdote]}
        <br/>
        {votes[popularAnecdote]} Votes
      </div>

    )
  }



const App = () => {

  

  const generateAnecdote = () =>{
    setSelected(Math.floor(Math.random() * anecdotes.length))
  }

  const addVote = () =>{
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
    if (mostPopular == -1 || copy[selected]>copy[mostPopular])
      setMostPopular(selected)
  }


  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [selected, setSelected] = useState(0)
  const [mostPopular, setMostPopular] = useState(-1)

  return (
    <div>
      {anecdotes[selected]}
      <br/>
      Current Vote total: {votes[selected]}
      <br/>
      <Button text ="Generate Anecdote" handleClick={generateAnecdote}/>
      <Button text ="Vote" handleClick={addVote}/>
      <br/>
      <Popanec popularAnecdote={mostPopular} anecdotes = {anecdotes} votes = {votes}/>

    </div>
  )
}

export default App