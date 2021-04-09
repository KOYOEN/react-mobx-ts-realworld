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
    const articlesCount = articleStore.articleListData.articlesCount/10;
    const query = this.props.location.search.split('&').slice(0, -1).join('&');
    return (
      [...Array(articlesCount)].map((_, i) =>
        <li className={`${styles.feedNavItem}`} key={i}>
          <a className={`${styles.feedNavLink} ${ i == articleStore.offset/10 ? styles.feedNavSelected : ""}` } href={`${query}&offset=${i*10}`}>{i + 1}</a>
        </li>
      )
    );
  }

  render() {
    return (
      <ul className={styles.feedNav}>
        {articleStore.articleListData && this.renderFeedNavItem}
      </ul>
    );
  }
}