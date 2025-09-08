import Part from './Part'

const Content = ({ parts }) => {
  // It will render the 3 <Part /> components, each one with their respective name and number of exercises 
  return (
    <div>
      {parts.map(part => (<Part key={part.name} name={part.name} exercises={part.exercises} />))}
    </div>)
  /* return (
    <div>
      <Part name={parts[0].name} exercises={parts[0].exercises} />
      <Part name={parts[1].name} exercises={parts[1].exercises} />
      <Part name={parts[2].name} exercises={parts[2].exercises} />
    </div>
  ) */
}

export default Content