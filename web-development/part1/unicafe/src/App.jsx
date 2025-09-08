import { useState } from 'react'

import './App.css'

const Button = ({ label, onClick }) => {
  return (
    <div className='button-container'>
      <button type="button" onClick={onClick}>{label}</button>
    </div>
  )
}

const StatisticLine = ({ text, value, percentage = false }) => {
  return (
    percentage ?
      <tr><td>{text}</td><td>{`${value}%`}</td></tr>
      : <tr><td>{text}</td><td>{value}</td></tr>
  )
}

const STATS_GOOD = "good"
const STATS_NEUTRAL = "neutal"
const STATS_BAD = "bad"
const STATS_ALL = "all"
const STATS_AVG = "average"
const STATS_POSITIVE_PERC = "positive"

const Empty = () => {
  const title = "statistics"
  const noFeedbackText = "No feedback given"

  return (
    <div>
      <h1>{title}</h1>
      <div className='feedback-text'>
        <div>{noFeedbackText}</div>
      </div>
    </div>

  )
}

const Statistics = ({ good, neutral, bad }) => {
  const title = "statistics"

  const calculatedAll = good + neutral + bad
  const calculatedAvg = (good * 1 + neutral * 0 + bad * -1) / (calculatedAll)
  const calculatedPercPositive = (good) * 100 / (calculatedAll)

  return (
    <div>
      <h1>{title}</h1>
      <table>
        <tbody>
          <StatisticLine text={STATS_GOOD} value={good} />
          <StatisticLine text={STATS_NEUTRAL} value={neutral} />
          <StatisticLine text={STATS_BAD} value={bad} />
          <StatisticLine text={STATS_ALL} value={calculatedAll} />
          <StatisticLine text={STATS_AVG} value={calculatedAvg} />
          <StatisticLine text={STATS_POSITIVE_PERC} value={calculatedPercPositive} percentage={true} />
        </tbody>
      </table>

    </div>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const title = "give feedback"

  let anyFeedback = good + neutral + bad

  const handleClickGood = () => {
    setGood(good + 1)
  }

  const handleClickNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleClickBad = () => {
    setBad(bad + 1)
  }

  return (
    <>
      <h1>{title}</h1>

      <div className='buttons-box'>
        <Button label={"good"} onClick={() => { handleClickGood() }} />
        <Button label={"neutral"} onClick={() => { handleClickNeutral() }} />
        <Button label={"bad"} onClick={() => { handleClickBad() }} />
      </div>

      {anyFeedback > 0 ?
        <Statistics good={good} bad={bad} neutral={neutral} /> : <Empty />}

    </>
  )
}

export default App
