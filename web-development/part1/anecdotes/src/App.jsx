import { useEffect, useState } from 'react'

import './App.css'

const MostVotedAnecdote = ({ anecdoteWithMostVotes, numberOfCurrentVotes }) => {
  return (
    <div>
      <div>{anecdoteWithMostVotes}</div>
      <div>{`has ${numberOfCurrentVotes} votes`}</div>
    </div>
  )
}

const NoVotesYet = () => {
  return (
    <div>
      <span>No votes yet</span>
    </div>
  )
}

const App = () => {

  const [selected, setSelected] = useState(0)

  const votes = { 0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 }
  const [votesCount, setVotesCount] = useState(votes)
  let copy = { ...votesCount }

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  let random

  useEffect(() => {
    recalculateRandom()
    return () => {
      0
    }
  }, [random])

  const recalculateRandom = () => {
    random = Number((Math.random() * 10).toFixed(0));
    random < 8 && random !== selected ? setSelected(random) : recalculateRandom();

  }

  const handleVote = () => {
    copy[selected] += 1
    setVotesCount(copy)
  }

  const getAnecdoteWithMostVotes = (obj) => {
    const arrayVotes = Object.entries(obj)
      .sort((a, b) => a[1] - b[1])
    const length = arrayVotes.length
    const lastElement = length - 1
    const [index, numberOfVotes] = arrayVotes[lastElement]
    return [anecdotes[index], numberOfVotes]
  }

  const [anecdoteWithMostVotes, numberOfCurrentVotes] = getAnecdoteWithMostVotes(votesCount)



  return (
    <div>
      <div>
        <h2>Anecdote of the day</h2>
      </div>
      <div>{anecdotes[selected]}</div>
      <div><span>{`has ${votesCount[selected]} votes`}</span></div>
      <div className='buttons-box'>
        <div className='button-container'><button onClick={handleVote}><span>vote</span></button></div>
        <div className='button-container'><button onClick={recalculateRandom}><span>next andecdote</span></button></div>
      </div>
      <div>
        <h2>Anecdote with most votes</h2>
        {numberOfCurrentVotes > 0 ? <MostVotedAnecdote anecdoteWithMostVotes={anecdoteWithMostVotes} numberOfCurrentVotes={numberOfCurrentVotes} /> : <NoVotesYet />}
      </div>
    </div>
  )

}

export default App
