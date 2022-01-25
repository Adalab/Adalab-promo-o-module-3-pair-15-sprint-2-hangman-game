const Form = props => {
return (
    <form className="form" onSubmit={props.handleSubmit}>
    <label className="title" htmlFor="last-letter">
      Escribe una letra:
    </label>
    <input
      autoComplete="off"
      className="form__input"
      maxLength="1"
      type="text"
      name="last-letter"
      id="last-letter"
      value={props.lastLetter}
      onChange={props.handleInputChange}
    />
  </form> 
)
}
export default Form;