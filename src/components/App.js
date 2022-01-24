import "../styles/App.scss";
import { useState, useEffect } from "react";
import callToApi from '../services/fetch';
import Header from './Header';

function App() {
  const [word, setWord] = useState('');
  const [lastLetter, setLastLetter] = useState("");
  const [userLetters, setUserLetters] = useState([]);
  const [incorrectLetters, setIncorrectLetters] = useState([]);

  useEffect(() => {
    callToApi().then((response) => {
      setWord(response);
    });
  }, []);

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
        //Si no es una letra correcta y no está repetida, se guarda en el array de letras incorrectas (incorrectLetters)
        if(!incorrectLetters.includes(inputValue)) {
          setIncorrectLetters([...incorrectLetters, inputValue]);
        }        
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
//Devuleve length del array de letras incorrectas y ese número es el que aumenta el moñeco
  const renderMoñeco = () => {
    return incorrectLetters.length
  };

  return (
    <div>
      <div className="page">
        <Header/>
        <main className="main">
          <section>
            <div className="solution">
              <h2 className="title">Solución:</h2>
              <ul className="letters">{renderSolutionLetters()}</ul>
            </div>
            <div className="error">
              <h2 className="title">Letras falladas:</h2>
              <ul className="letters">{renderErrorLetters()}</ul>
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
          {/*si el número (length) del array es igual o mayor a 13, devuelve mensaje o nada*/}
          <h1>{renderMoñeco() >= 13 ? 'Has perdido' : ''}</h1>
          {/*renderMoñeco pinta el número (length) del array de incorrectLetters*/}
          <section className={`dummy error-${renderMoñeco()}`}>
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
