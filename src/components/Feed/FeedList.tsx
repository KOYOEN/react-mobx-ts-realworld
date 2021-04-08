import React from "react";
import {computed} from "mobx";
import styles from "./feed.module.less";
import {ArticleStore} from "../../stores";
import {observer} from "mobx-react";

const articleStore = ArticleStore.getInstance();

@observer
export class FeedList extends React.Component {
  @computed
  get renderArticleList() {
    if (articleStore.articleData.articlesCount === 0) {
      return (
        <div className={styles.articlePreview} >
          <span> No articles are here... yet </span>
        </div>
      );
    }
    return articleStore.articleData.articles.map((article, i) => {
      return (
        <div className={styles.articlePreview} key={i}>
          <div className={styles.articleMeta}>
            <div className={styles.wrapUserInfo}>
              <a href={article.author.username}>
                <img className={styles.imgProfile} src={article.author.image}/>
              </a>
              <div className={styles.info}>
                <a href={article.author.username}>{article.author.username}</a>
                <span>{new Date(article.createdAt).toDateString()}</span>
              </div>
            </div>
            <div className={styles.wrapButton}>
              <button className={styles.buttonLike}>
                <i className={styles.iconHeart}>{article.favoritesCount}</i>
              </button>
            </div>
          </div>
          <a className={styles.linkPreview} href={article.slug}>
            <h1>{article.title}</h1>
            <p>{article.description}</p>
            <div className={styles.wrapTagList}>
              <span>Read more...</span>
              <ul>
                {
                  article.tagList.map((tag) => <li className={styles.tag}>{tag}</li>)
                }
              </ul>
            </div>
          </a>
        </div>
      );
    });
  }

  render() {
    return (
      <React.Fragment>
        {articleStore.articleData && this.renderArticleList }
      </React.Fragment>
    );
  }
}