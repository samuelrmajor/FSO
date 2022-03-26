import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import { hideNotification } from '../reducers/notificationReducer'


const Anecdote = ({anecdote, handleClick}) => {

return (


            <div>
                <div>
                {anecdote.content}
                </div>
                <div>
                has {anecdote.votes}
                <button onClick={handleClick}>vote</button>
                </div>
            </div>
            


)

}





const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state.anecdotes)
    const handleClick = (anecdote) => {

    }
    return (
        <div>
                <h2>Anecdotes</h2>
                {anecdotes.map(anecdote =>
                    <Anecdote 
                        key={anecdote.id}
                        anecdote = {anecdote}
                        handleClick = {() => {
                            dispatch(voteAnecdote(anecdote.id))
                            dispatch(showNotification({type: "like", content: anecdote.content}))
                            setTimeout(() => {
                                dispatch(hideNotification())
                                }, 5000)
                        }}
                    />
                )}
        </div>

    )

}

export default Anecdotes