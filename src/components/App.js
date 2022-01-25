import "../styles/App.scss";
import { useState, useEffect } from "react";
import callToApi from "../services/fetch";
import Header from "./Header";
import Muñeco from "./Muñeco";
import SolutionLetters from "./SolutionLetters";
import ErrorLetters from "./ErrorLetters";
import { Route, Switch } from "react-router-dom";
import Footer from "./Footer";
import Instructions from "./Instructions";
import Options from "./Options";
import Form from "./Form";
import Loading from "./Loading";

function App() {
  const [word, setWord] = useState("");
  const [lastLetter, setLastLetter] = useState("");
  const [userLetters, setUserLetters] = useState([]);
  const [incorrectLetters, setIncorrectLetters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (ev) => {
    ev.preventDefault();
  };

  useEffect(() => {
    setIsLoading(true);
    callToApi().then((response) => {
      console.log(response);
      setWord(response);
      setIsLoading(false);
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
        if (!incorrectLetters.includes(inputValue)) {
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
    return incorrectLetters.length;
  };

  return (
    <div>
      <div className="page">
        <Header />
        <main className="main">
          <Loading isLoading={isLoading} />
          <Switch>
            <Route path="/instructions">
              <Instructions />
            </Route>
            <Route path="/options">
              <Options />
            </Route>
            <Route exact path="/">
              <section>
                <SolutionLetters letters={renderSolutionLetters()} />
                <ErrorLetters letters={renderErrorLetters()} />
                {/*Las funciones de handle del input no llevan paréntesis porque no devuelven nada, solo controlan*/}
                <Form
                  handleSubmit={handleSubmit}
                  lastLetter={lastLetter}
                  handleInputChange={handleInputChange}
                />
              </section>
              {/*si el número (length) del array es igual o mayor a 13, devuelve mensaje o nada*/}
              <h1>{renderMoñeco() >= 13 ? "Has perdido" : ""}</h1>
            </Route>
          </Switch>
          <Muñeco numberOfErrors={renderMoñeco()} />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
