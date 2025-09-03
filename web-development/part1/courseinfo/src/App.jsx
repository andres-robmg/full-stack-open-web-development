const Header = ({ course }) => {
  return (
    <div>
      <h1>{course}</h1>
    </div>
  )
}

const Content = ({ parts }) => {
  // It will render the 3 <Part /> components, each one with their respective name and number of exercises 
  /* return (
    { <div>
      {parts.map(part => (<Part name={part.name} exercises={part.exercises} />))}
    </div> } */
  return (
    <div>
      <Part name={parts[0].name} exercises={parts[0].exercises} />
      <Part name={parts[1].name} exercises={parts[1].exercises} />
      <Part name={parts[2].name} exercises={parts[2].exercises} />
    </div>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <div>
      <p>{name} {exercises}</p>
    </div>
  )
}

const Total = ({ exercises }) => {
  return (
    <div>
      <p>Number of exercises {exercises}</p>
    </div>
  )
}


const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  const parts = [
    { name: part1, exercises: exercises1 },
    { name: part2, exercises: exercises2 },
    { name: part3, exercises: exercises3 },
  ]

  const totalExercises = exercises1 + exercises2 + exercises3

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total exercises={totalExercises} />
    </div>
  )
}

export default App