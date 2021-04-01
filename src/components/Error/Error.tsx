import React from "react";
import styles from "./error.module.less";
import {observer} from "mobx-react";
import {computed} from "mobx";
import {AuthStore} from "../../stores";


interface Props {
  statement: object
}

@observer
export class Error extends React.Component<Props> {

  @computed
  get renderList() {

    return Object.entries(this.props.statement).map( (error, idx) => {
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