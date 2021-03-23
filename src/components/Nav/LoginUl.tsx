import { Link } from "react-router-dom";
import React from "react";


class LoginUl extends React.Component {

  render() {
    return (
      <ul>
        <li className="nav-item">
          <Link className={"nav-link"} to={"/"}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className={"nav-link"} to={"/editor"}>New Post</Link>
        </li>
        <li className="nav-item">
          <Link className={"nav-link"} to={"/settings"}>Settings</Link>
        </li>
        {/*<li className="nav-item">*/}
        {/*  <Link className="nav-link" to={"@" + }></Link>*/}
        {/*</li>*/}
      </ul>
    );
  }
}


export default LoginUl;
