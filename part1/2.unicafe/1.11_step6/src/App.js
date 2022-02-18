import { useState } from 'react'

const Button = ({onclick,text}) =>
  <button onClick={onclick}>{text}</button>

const Statistics = ({value}) => {
  console.log(value)
  return (
      <div>
        <StatisticLine text="good" value={value.good} symbol="" />
        <StatisticLine text="neutral" value={value.neutral} symbol="" />
        <StatisticLine text="bad" value={value.bad} symbol="" />
        <StatisticLine text="all" value={value.all} symbol="" />
        <StatisticLine text="averege" value={value.averege} symbol="" />
        <StatisticLine text="positive" value={value.positive} symbol="%" />
      </div>
    )
}

const StatisticLine = ({text,value,symbol}) =>
  <tr><td>{text}</td><td>{value} {symbol}</td></tr>

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
  
  const statistics = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: all,
    averege: averege(),
    positive: positive()
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
      <table>
      <Statistics value={statistics} />
      </table>
    </div>
  )
}

export default App