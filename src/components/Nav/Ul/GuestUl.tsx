import {Link} from "react-router-dom";
import React from "react";
import styles from "./ul.module.less";


class GuestUl extends React.Component {
  render() {
    return (
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <Link className={styles.navLink} to={"/"}>Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.navLink} to={"/login"}>Sign in</Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.navLink} to={"/register"}>Sign up</Link>
        </li>
      </ul>
    );
  }
}

export default GuestUl;