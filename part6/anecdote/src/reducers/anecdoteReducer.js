const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type){
    case "VOTE_ANECDOTE":
      const id = action.data.id
      const anecdoteToChange = state.find(n=> n.id === id)
      const changedAnecdote = {...anecdoteToChange, votes: anecdoteToChange.votes+1}
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote).sort((a,b) => b.votes -a.votes)
    case "NEW_ANECDOTE":
      return [...state, action.data].sort((a,b) => b.votes -a.votes)
  }
}

const getId = () => (100000 * Math.random()).toFixed(0)
const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const createAnecdote = (content) => {
  return {
    type: 'NEW_ANECDOTE',
    data: asObject(content)
  }
}

export const voteAnecdote = (id) => {
  return {
    type: "VOTE_ANECDOTE",
    data: {
      id: id
    }
  }
}


export default reducer