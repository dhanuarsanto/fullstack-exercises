import { useState } from 'react'

const Button = ({handle, text}) => <button onClick={handle}>{text}</button>

const Display = ({title, anecdote, vote}) => {
  return (
    <>
      <h1>{title}</h1>
      <div>{anecdote}</div>
      <div>has {vote} votes</div>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  const points = Array(anecdotes.length).fill(0)
  
  const copy = [...points]
  
  const [selected, setSelected] = useState(0)
  
  const [voted, setVoted] = useState(copy)
  
  const handleClickNext = () => setSelected(Math.floor(Math.random() * 7))
  
  const handleClickVote = () => {
    voted.fill(voted[selected] + 1,selected,selected + 1)
    setVoted(voted => [...voted])
  }
  
  const mostVote = voted.indexOf(Math.max(...voted))
  
  console.log(voted)

  return (
    <div>
      <Display title="Anecdote of the day" anecdote={anecdotes[selected]} vote={voted[selected]} />
      <Button handle={handleClickVote} text="votes" />
      <Button handle={handleClickNext} text="next anecdotes" />
      <Display title="anecdote with most votes" anecdote={anecdotes[mostVote]} vote={voted[mostVote]} />
      </div>
  )
}

export default App