const PersonForm = ({ newName, newPhone, handleChangeName, handleChangePhone, handleSubmitForm }) => {
  return (
    <div>
      <form>
        <div>
          name: <input type='text' value={newName} onChange={(e) => handleChangeName(e.target.value)} />
        </div>
        <div>
          number: <input type='text' value={newPhone} onChange={(e) => handleChangePhone(e.target.value)} />
        </div>
        <div>
          <button onClick={(e) => handleSubmitForm()} type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default PersonForm