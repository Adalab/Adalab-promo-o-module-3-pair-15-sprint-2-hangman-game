import { NavLink } from "react-router-dom";

function Footer (props) {
    return (
<footer className="footer">
  <nav>
    <ul>
      <li className="footer__menu-item">
        <NavLink className="footer__menu-link" exact to="/">A jugar</NavLink>
      </li>
      <li className="footer__menu-item">
        <NavLink className="footer__menu-link active" to="/instructions">¿Cómo se juega?</NavLink>
      </li>
      <li className="footer__menu-item">
        <NavLink className="footer__menu-link" to="/options">Más opciones</NavLink>
      </li>
    </ul>
  </nav>
  <small className="footer__copy">© Adalab</small>
</footer>
    );
}

export default Footer;