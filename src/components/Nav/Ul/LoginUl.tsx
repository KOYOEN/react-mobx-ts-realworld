import { Link } from "react-router-dom";
import React from "react";
import styles from "./ul.module.less";
import {computed} from "mobx";
import {UserStore} from "../../../stores";
import {observer} from "mobx-react";

const userStore = UserStore.getInstance();

@observer
class LoginUl extends React.Component {
  @computed
  get getUsername() {
    return userStore.currentUser.username;
  }

  @computed
  get getImagePath() {
    return userStore.currentUser.image;
  }

  render() {
    return (
      <ul>
        <li className={styles.navItem}>
          <Link className={styles.navLink} to={"/"}>Home</Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.navLink} to={"/editor"}>New Post</Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.navLink} to={"/settings"}>Settings</Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.navLink} to={"@" + this.getUsername}>
            <img className={styles.userPic} src={this.getImagePath} />
            {this.getUsername}
          </Link>
        </li>
      </ul>
    );
  }
}

export default LoginUl;
