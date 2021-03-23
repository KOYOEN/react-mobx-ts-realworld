import React from 'react';
import { Link } from "react-router-dom";
import GuestNav from "./GuestUl";

class Nav extends React.Component {
  render() {
    return (
      <nav className={"navbar"}>
        <div className="container">
          <Link className={"navbar-brand"} to="/">conduit</Link>
          {GuestNav}
        </div>
      </nav>
    );
  }
}

export default Nav;
