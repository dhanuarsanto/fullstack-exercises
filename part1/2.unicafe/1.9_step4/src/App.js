import { useState } from 'react'

const Button = ({onclick,text}) =>
  <button onClick={onclick}>{text}</button>

const Statistics = ({text,value,symbol}) =>
  <div>{text} {value} {symbol}</div>

const Header = (props) => {
  return (
      <div>
        <h1>give feedback</h1>
        <Button onclick={props.buttonGood} text="good" />
        <Button onclick={props.buttonNeutral} text="neutral" />
        <Button onclick={props.buttonBad} text="bad" />
        <h1>statistics</h1>
      </div>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const all = good + neutral + bad
  
  const handleClickGood = () => setGood(good + 1)
  const handleClickNeutral = () => setNeutral(neutral + 1)
  const handleClickBad = () => setBad(bad + 1)
  
  const averege = () => {
    const feedback = good - bad
    if (all === 0) return 0
    return feedback / all
  }
  
  const positive = () => {
    if (all === 0) return 0
    return good / all * 100
  }
  
  if (all === 0) {
    return (
      <div>
        <Header
          buttonGood={handleClickGood}
          buttonNeutral={handleClickNeutral}
          buttonBad={handleClickBad}
        />
        <p>No feedback given</p>
      </div>
      )
  }

  return (
    <div>
      <Header
        buttonGood={handleClickGood}
        buttonNeutral={handleClickNeutral}
        buttonBad={handleClickBad}
      />
      <Statistics text="good" value={good} symbol="" />
      <Statistics text="neutral" value={neutral} symbol="" />
      <Statistics text="bad" value={bad} symbol="" / >
      <Statistics text="all" value={all} symbol="" />
      <Statistics text="averege" value={averege()} symbol="" />
      <Statistics text="positive" value={positive()} symbol="%" />
    </div>
  )
}

export default App