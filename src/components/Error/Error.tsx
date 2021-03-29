import React from "react";
import styles from "./error.module.less";
import {computed} from "mobx";

const statement = {
  invalid: "email or password is invalid",
}
export class Error extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ul className={styles['error-messages']}>
        <li>{statement.invalid}</li>
      </ul>
    );
  }
}