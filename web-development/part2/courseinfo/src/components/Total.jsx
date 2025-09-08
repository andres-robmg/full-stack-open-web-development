const Total = ({ parts }) => {

  const totalExercises = parts.reduce((s, p) => {
    return s + p.exercises
  }, 0)

  return (
    <div>
      <p><strong>{`total of ${totalExercises} exercises`}</strong></p>
    </div>
  )
}

export default Total