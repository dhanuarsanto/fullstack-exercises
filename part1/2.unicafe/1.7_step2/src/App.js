import { useState } from 'react'

const Button = ({onclick,text}) => {
  return (
    <button onClick={onclick}>{text}</button>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleClickGood = () => setGood(good + 1)
  const handleClickNeutral = () => setNeutral(neutral + 1)
  const handleClickBad = () => setBad(bad + 1)
  
  const averege = () => {
    const feedback = good - bad
    const all = good + neutral + bad
    if (all === 0) return 0
    return feedback / all
  }
  
  const positive = () => {
    const all = good + neutral + bad
    if (all === 0) return 0
    return good / all * 100
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onclick={handleClickGood} text="good" />
      <Button onclick={handleClickNeutral} text="neutral" />
      <Button onclick={handleClickBad} text="bad" />
      <h1>statistics</h1>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {good + neutral + bad}</div>
      <div>averege {averege()}</div>
      <div>positive {positive()} %</div>
    </div>
  )
}

export default App