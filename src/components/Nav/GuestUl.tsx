import {Link} from "react-router-dom";
import React from "react";


class GuestNav extends React.Component {

  render() {
    return (
      <ul className={"navbar-nav"}>
        <li className="nav-item">
          <Link className={"nav-item"} to={"/"}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className={"nav-item"} to={"/login"}>Sign in</Link>
        </li>
        <li className="nav-item">
          <Link className={"nav-item"} to={"/register"}>Sign up</Link>
        </li>
      </ul>
    );
  }
}

export default GuestNav;