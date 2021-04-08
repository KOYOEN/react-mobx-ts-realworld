import React from "react";
import {computed} from "mobx";
import styles from "./feed.module.less";
import {observer} from "mobx-react";
import {ArticleStore} from "../../stores";
import {RouteComponentProps} from "react-router-dom";

const articleStore = ArticleStore.getInstance();

interface Props extends RouteComponentProps {}

@observer
export class FeedNav extends React.Component<Props> {

  @computed
  get renderFeedNavItem() {
    const articlesCount = articleStore.articleData.articlesCount/10;
    const query = this.props.location.search.split('&').slice(0, -1).join('&');
    return (
      [...Array(articlesCount)].map((_, i) =>
        <li className={styles.feedNavItem} key={i + 1}>
          <a
            href={`${query}&offset=${i}`}
            className={styles.feedNavLink}>{i + 1}</a>
        </li>)
    );
  }

  render() {
    return (
      <ul className={styles.feedNav}>
        {articleStore.articleData && this.renderFeedNavItem}
      </ul>
    );
  }
}