function ErrorLetters(props) {
    return (
        <div className="error">
            <h2 className="title">Letras falladas:</h2>
            <ul className="letters">{props.letters}</ul>
        </div>
    )
};


export default ErrorLetters;