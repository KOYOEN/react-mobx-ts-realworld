import React from 'react';
import { Link } from "react-router-dom";
import { GuestUl, LoginUl } from "./Ul";
import styles from './nav.module.less';
import {UserStore} from "../../stores";
import {computed, observable} from "mobx";
import {observer} from "mobx-react";

@observer
class Nav extends React.Component {

  @computed
  get renderUl() {
    const userStore = UserStore.getInstance();
    console.log(userStore.currentUser ? "True" : "False");
    return (userStore.currentUser) ? <LoginUl /> : <GuestUl />
  }

  render() {
    return (
      <nav className={styles.navbar}>
        <div className={styles.container}>
          <Link className={styles.navbarBrand} to="/">conduit</Link>
          {this.renderUl}
        </div>
      </nav>
    );
  }
}

export default Nav;
