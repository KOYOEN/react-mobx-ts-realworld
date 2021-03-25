import {Link} from "react-router-dom";
import React from "react";
import styles from "./ul.module.less";


class GuestUl extends React.Component {
  render() {
    return (
      <ul className="">
        <li className={styles['nav-item']}>
          <Link className={styles['nav-link']} to={"/"}>Home</Link>
        </li>
        <li className={styles['nav-item']}>
          <Link className={styles['nav-link']} to={"/login"}>Sign in</Link>
        </li>
        <li className={styles['nav-item']}>
          <Link className={styles['nav-link']} to={"/register"}>Sign up</Link>
        </li>
      </ul>
    );
  }
}

export default GuestUl;