import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";

function Navigation() {
  return (
    <div className="wrapper">
      <div className="nav-link-area">
        <div><NavLink to="/">Home</NavLink></div>
        <div><ProfileButton /></div>
      </div>

    </div>
  );
}

export default Navigation;
