import React from "react";
import styles from "./feed.module.less";
import {Link, RouteComponentProps} from "react-router-dom";
import {ArticleStore, MainStore, UserStore} from "../../stores";
import {action, computed, observable} from "mobx";
import {observer} from "mobx-react";
import {FeedNav} from "./FeedNav";
import {FeedList} from "./FeedList";
import {FeedBar} from "./FeedBar";

const mainStore = MainStore.getInstance();
const articleStore = ArticleStore.getInstance();

interface Props extends RouteComponentProps {}


@observer
export class Feed extends React.Component<Props> {

  render() {
    return (
      <section className={styles.feedSection}>
        <FeedBar />
        <FeedList />
        <FeedNav {...this.props}/>
      </section>
    );
  }
}