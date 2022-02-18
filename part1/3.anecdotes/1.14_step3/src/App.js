import { useState } from 'react'

const Button = ({handle,text}) => <button onClick={handle} >{text}</button>

const Display = ({title,anecdote,vote}) => {
  return (
    <div>
      <h1>{title}</h1>
      <div>{anecdote}</div>
      <div>has {vote} votes</div>
    </div>
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
  
  const max = anecdotes.length
  const points = Array(max).fill(0)
  const copy = [...points]
  const [selected, setSelected] = useState(0)
  const [voted, setVoted] = useState(copy)
  
  const mostVote = Math.max(...voted)
  const indexMost = voted.indexOf(mostVote)
  
  const handleClickRandom = () => {
    const random = Math.floor(Math.random() * max)
    setSelected(random)
  }
  
  const handleClickVote = () => {
    voted[selected] += 1
    setVoted(voted => [...voted])
  }
  
  console.log(voted)

  return (
    <div>
      <Display
        title="Anecdote of the day"
        anecdote={anecdotes[selected]}
        vote={voted[selected]}
      />
      <Button text="vote" handle={handleClickVote} />
      <Button text="next anecdote" handle={handleClickRandom} />
      <Display
        title="Anecdote with most votes"
        anecdote={anecdotes[indexMost]}
        vote={voted[indexMost]}
      />
    </div>
  )
}

export default App