const Filter = ({ handleChangeSearchString, searchString }) => {
  return (
    <div>
      {`filter shown with`} <input type="text" value={searchString} onChange={(e) => handleChangeSearchString(e.target.value)} />
    </div>
  )
}

export default Filter