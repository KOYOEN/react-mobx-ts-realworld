import React from "react";
import {observer} from "mobx-react";
import {computed} from "mobx";
import styles from "./feed.module.less";
import {Link} from "react-router-dom";
import {ArticleStore, MainStore} from "../../stores";

const mainStore = MainStore.getInstance();
const articleStore = ArticleStore.getInstance();

@observer
export class FeedBar extends React.Component {

  render() {
    const isMyFeed = articleStore.selectedTab === 'personal';
    const isGlobalFeed = articleStore.selectedTab === 'global';
    const isTagFeed = articleStore.selectedTab === 'tag';

    console.log(isMyFeed, isGlobalFeed, articleStore.selectedTab);
    return (
      <div>
        <ul className={styles.feedBarList}>
          <li className={`${styles.feedBarItem} ${(!mainStore.token ? styles.notused : "")}` } key={0}>
            <Link
              to={`/?feed=personal&offset=0`}
              className={`${styles.feedBarLink} ${(isMyFeed ? styles.selected : "")}`}
            >
              Your Feed
            </Link>
          </li>
          <li className={`${styles.feedBarItem} `} key={1}>
            <Link
              to={`/?feed=global&offset=0`}
              className={`${styles.feedBarLink} ${isGlobalFeed ? styles.selected : ""}`}
            >
              Global Feed
            </Link>
          </li>
          <li className={`${styles.feedBarItem} ${!isTagFeed ? styles.notused : ""} `} >
            <Link
              to={`/tag=${this}`}
              className={`${styles.feedBarLink} ${isTagFeed ? styles.selected : ""}` } >
              #
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}