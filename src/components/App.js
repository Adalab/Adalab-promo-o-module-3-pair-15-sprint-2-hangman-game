import "../styles/App.scss";
import { useState } from "react";

// Al arrancar la página:

// - traer solución de la API (string)
// - pintar rayitas longitud palabra

// Cuando la usuaria mete 1 letra:

// Verificar si ya existe en array solución/falladas

// Verificar si está dentro de la palabra solución

// - Si lo está >>> que aparezca en la solución tantas veces como se repita

// - Si no lo está >>> que aparezca en los errores (letra y rayita) Y pinte parte del cuerpo del ahorcado Y actualice contador de errores

// RESET: durante todo el juego disponible
// Si se ha pintado todo el ahorcado (num máx de errores), pierdes, reset, nueva palabra api
// Si se ha completado la solución, ganas, reset, nueva palabra api

function App() {
  const [word, setWord] = useState("pepino");
  const [numberOfErrors, setNumberOfErrors] = useState(0);
  const [lastLetter, setLastLetter] = useState("");
  const [userLetters, setUserLetters] = useState([]);
  const [incorrectLetters, setIncorrectLetters] = useState([]);

  const handleButtonClick = () => {
    setNumberOfErrors(numberOfErrors + 1);
  };

  //Recoger el input del usuario
  const handleInputChange = (ev) => {
    //Evita el envío del formulario
    ev.preventDefault();
    //Recoge el valor del input
    const inputValue = ev.currentTarget.value;
    //Expresión regular para solo aceptar caracteres permitidos
    const regex = new RegExp("^[a-zA-Z\u00C0-\u00FF]?$");
    //Si es un caracter permitido y no es algo en blanco o un espacio,
    if (regex.test(inputValue) && inputValue !== "") {
      //el input se guarda en lastLetter
      setLastLetter(inputValue);
      //Si la palabra correcta incluye lastLetter,
      if (word.includes(inputValue)) {
        //se guarda en el array de letras correctas (userLetters)
        setUserLetters([...userLetters, inputValue]);
      } else {
        //Si no es una letra correcta, se guarda en el array de letras incorrectas (incorrectLetters)
        setIncorrectLetters([...incorrectLetters, inputValue]);
      }
    } else {
      //Después, se limpia lastLetter
      setLastLetter("");
    }
  };

  //Pintar letras correctas
  const renderSolutionLetters = () => {
    //convertir la palabra (word, que es un string), en un array con elementos separados (cada letra)
    const wordLetters = word.split("");
    // Pintar el guión de cada letra
    return wordLetters.map((eachLetter, index) => {
      //Si la letra es correcta, 
      if (userLetters.includes(eachLetter)) {
        return (
          //pinta la letra en solución
          <li className="letter" key={index}>
            {eachLetter}
          </li>
        );
      } else {
        //si no lo es, no pinta nada
        return <li className="letter" key={index}></li>;
      }
    });
  };

  const renderErrorLetters = () => {
    //El map recorre el array de letras incorrectas
    return incorrectLetters.map((eachLetter, index) => {
      //Si la letra incorrecta está incluida,
        if (incorrectLetters.includes(eachLetter)) {
          return (
            //pinta la letra y la rayita
            <li className="letter" key={index}>
              {eachLetter}
            </li>
          );
        } else {
          //si no, no pinta nada
          return <li className="letter" key={index}></li>;
        }
      });
  };

  return (
    <div>
      <div className="page">
        <header>
          <h1 className="header__title">Juego del ahorcado</h1>
        </header>
        <main className="main">
          <section>
            <div className="solution">
              <h2 className="title">Solución:</h2>
              <ul className="letters">
                {renderSolutionLetters()}
              </ul>
            </div>
            <div className="error">
              <h2 className="title">Letras falladas:</h2>
              <ul className="letters">
                {renderErrorLetters()}
              </ul>
            </div>
            <form className="form">
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
                value={lastLetter}
                onChange={handleInputChange}
              />
            </form>
          </section>
          <section className={`dummy error-${numberOfErrors}`}>
            <span className="error-13 eye"></span>
            <span className="error-12 eye"></span>
            <span className="error-11 line"></span>
            <span className="error-10 line"></span>
            <span className="error-9 line"></span>
            <span className="error-8 line"></span>
            <span className="error-7 line"></span>
            <span className="error-6 head"></span>
            <span className="error-5 line"></span>
            <span className="error-4 line"></span>
            <span className="error-3 line"></span>
            <span className="error-2 line"></span>
            <span className="error-1 line"></span>
            {/*<button onClick={handleButtonClick}>Incrementar</button>*/}
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
