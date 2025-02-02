import { NavLink } from "react-router-dom";
import css from "./Header.module.css";
import home from "../../assets/logo.svg";

export default function Header() {
  return (
    <nav className={css.container}>
      <NavLink to="/" className={css.text}>
              <img src={home} alt="home" className={css.icon} />
              RETN APARTMENT
      </NavLink>
    </nav>
  );
}
