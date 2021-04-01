import React from 'react';
import {AuthStore, MainStore, UserStore} from "../../stores";
import { Banner } from "../../components";
import {observer} from "mobx-react";
import styles from "./home.module.less"

interface Props {
}

const userStore = UserStore.getInstance();

@observer
class Home extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <div className="home-page">
        { !userStore.currentUser && <Banner /> }
        <div className={"container"} >
          <div className={"row"} >
            <ul className="">
              <li className={styles.feedBarItem}>Your Feed</li>
              <li className={styles.feedBarItem}>Global Feed</li>
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Home;
