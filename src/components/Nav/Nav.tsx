import React from 'react';
import { Link } from "react-router-dom";
import { GuestUl, LoginUl } from "./Ul";
import styles from './nav.module.less';

class Nav extends React.Component {

  render() {
    return (
      <nav className={styles['navbar']}>
        <div className={styles['container']}>
          <Link className={styles['navbar-brand']} to="/">conduit</Link>
          <GuestUl />
        </div>
      </nav>
    );
  }
}

export default Nav;
