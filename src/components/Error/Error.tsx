import React from "react";
import styles from "./error.module.less";
import {observer} from "mobx-react";
import {computed} from "mobx";
import {AuthStore} from "../../stores";


@observer
export class Error extends React.Component {

  @computed
  get renderList() {
    const authStore = AuthStore.getInstance();
    return Object.entries(authStore.statement).map( (error, idx) => {
      return <li key={idx}>{error.join(' ')}</li>;
    });
  }

  render() {
    return (
      <ul className={styles.errorMessages}>
        {this.renderList}
      </ul>
    );
  }
}