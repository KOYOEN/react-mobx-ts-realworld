import { Link } from "react-router-dom";
import React from "react";
import styles from "./ul.module.less";
import {computed} from "mobx";
import {UserStore} from "../../../stores";
import {observer} from "mobx-react";

class LoginUl extends React.Component {
  @computed
  get getUsername() {
    const userStore = UserStore.getInstance();
    return userStore.currentUser.username;
  }
  render() {
    const username = this.getUsername;
    return (
      <ul>
        <li className={styles['nav-item']}>
          <Link className={styles['nav-link']} to={"/"}>Home</Link>
        </li>
        <li className={styles['nav-item']}>
          <Link className={styles['nav-link']} to={"/editor"}>New Post</Link>
        </li>
        <li className={styles['nav-item']}>
          <Link className={styles['nav-link']} to={"/settings"}>Settings</Link>
        </li>
        <li className={styles['nav-item']}>
          <Link className={styles['nav-link']} to={"@" + username}>{username}</Link>
        </li>
      </ul>
    );
  }
}

export default LoginUl;
