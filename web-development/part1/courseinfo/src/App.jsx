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

  // Part 1.3 Refactoring: Variables/ Objects definition
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }

  // Refactoring: Objects in array (same as 1.4 requirement but with other approach)
  const parts = [
    part1,
    part2,
    part3,
  ]

  const totalExercises = part1.exercises + part2.exercises + part3.exercises


  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total exercises={totalExercises} />
    </div>
  )
}

export default App