import React from "react";
import { Link } from "react-router-dom";
import {computed} from "mobx";
import styles from "./feed.module.less";
import {ArticleStore} from "../../stores";
import {observer} from "mobx-react";
import {UserInfo} from "../UserInfo/UserInfo";


const articleStore = ArticleStore.getInstance();

@observer
export class FeedList extends React.Component {
  @computed
  get renderArticleList() {
    if (articleStore.articleListData.articlesCount === 0) {
      return (
        <div className={styles.articlePreview} >
          <span> No articles are here... yet </span>
        </div>
      );
    }
    return articleStore.articleListData.articles.map((article, i) => {
      return (
        <div className={styles.articlePreview} key={i}>
          <div className={styles.articleMeta}>
            <UserInfo article={article} isArticlePage={false} />
            <div className={styles.wrapButton}>
              <button className={styles.buttonLike}>
                <i className={styles.iconHeart}>{article.favoritesCount}</i>
              </button>
            </div>
          </div>
          <Link className={styles.linkPreview} to={`./article/${article.slug}`}>
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <div className={styles.wrapTagList}>
              <span>Read more...</span>
              <ul className={styles.tagList}>
                {
                  article.tagList.map((tag) => <li className={styles.tag}>{tag}</li>)
                }
              </ul>
            </div>
          </Link>
        </div>
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        {articleStore.articleListData && this.renderArticleList }
      </React.Fragment>
    );
  }
}