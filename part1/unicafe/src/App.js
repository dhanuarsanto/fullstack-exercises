import { useState } from 'react'

const TitleLabel = ({text}) => <h1>{text}</h1>

const Button = ({handleClick,text}) =>
  <button onClick={handleClick}>
    {text}
  </button>

const StatisticLine = ({text, value}) =>
  <>
    <td>{text}</td>
    <td>{value}</td>
  </>

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick =() => setBad(bad + 1)
  const allValue = () => good + neutral + bad
  
  const average = (value) => {
    const v = good - bad
    
    if (value === 0) {
      return 0
    }
    
    return v / value
  }
  
  const percentase = (value) => {
    if (value === 0) {
      return 0
    }
    
    const p = good / value * 100
    
    return p + '%'
  }
  
  if (allValue() === 0) {
    return (
      <div>
      <TitleLabel text="give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <TitleLabel text="statistics" />
      <p>No feedback given</p>
      </div>
    )
  }
  
  return (
    <div>
      <TitleLabel text="give feedback" />
      <Button handleClick={handleGoodClick} text="good" />
      <Button handleClick={handleNeutralClick} text="neutral" />
      <Button handleClick={handleBadClick} text="bad" />
      <TitleLabel text="statistics" />
      <table>
        <tr>
          <StatisticLine text="good" value ={good} />
        </tr>
        <tr>
          <StatisticLine text="neutral" value ={neutral} />
        </tr>
        <tr>
          <StatisticLine text="bad" value ={bad} />
        </tr>
        <tr>
          <StatisticLine text="all" value ={allValue()} />
        </tr>
        <tr>
          <StatisticLine text="average" value ={average(allValue())} />
        </tr>
        <tr>
          <StatisticLine text="positive" value ={percentase(allValue())} />
        </tr>
      </table>
    </div>
  )
}

export default App