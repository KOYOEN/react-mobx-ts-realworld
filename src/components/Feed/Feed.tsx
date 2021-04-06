import React from "react";
import styles from "./feed.module.less";
import {Link, RouteComponentProps} from "react-router-dom";
import {ArticleStore, UserStore} from "../../stores";
import {computed, observable} from "mobx";
import {observer} from "mobx-react";


const userStore = UserStore.getInstance();
const articleStore = ArticleStore.getInstance();

@observer
export class Feed extends React.Component {

  @computed
  get renderArticleList() {
    if (articleStore.articleData.articlesCount === 0) {
      return <div className={styles.articlePreview}>No articles are here... yet</div>
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
                <i className={styles.iconHeart} >{article.favoritesCount}</i>
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
  };

  @computed
  get renderPageNav() {
    const articlesCount = articleStore.articleData.articlesCount/10;
    return (
      <ul className={styles.pageNav}>
        {
          [...Array(articlesCount)].map((_, i) =>
            <li className={styles.pageNavItem} key={i+1}>
              <a className={styles.pageNavLink} >{i+1}</a>
            </li>)
        }
      </ul>
    );
  }

  render() {
    const isMyFeed = (userStore.currentUser && articleStore.selectedTab === userStore.currentUser.username);
    const isGlobalFeed = articleStore.selectedTab === 'global';
    const isTagFeed = articleStore.selectedTab === 'tag';
    return (
      <section className={styles.feedSection}>
        <ul className={styles.feedBarList}>
          <li className={`${styles.feedBarItem} ${(!userStore.currentUser ? styles.notused : "")} + ${(isMyFeed ? styles.selected : "")}` }>
            <Link to={`/?author=${ userStore.currentUser ? userStore.currentUser.username : ''}`} className={`${styles.feedBarLink}`}>
              Your Feed
            </Link>
          </li>
          <li className={`${styles.feedBarItem} `} >
            <Link to={`/`} className={`${styles.feedBarLink} ${isGlobalFeed ? styles.selected : ""}`}>Global Feed</Link>
          </li>
          {/*<li className={`${styles.feedBarItem} ` + isTagFeed ? styles.selected : '' } >*/}
          {/*  <Link to={`/tag=${this}`} className={`${styles.feedBarLink}`} >*/}
          {/*    {this.tag}*/}
          {/*  </Link>*/}
          {/*</li>*/}
        </ul>
        {articleStore.articleData && this.renderArticleList}
        {articleStore.articleData && this.renderPageNav}
      </section>
    );
  }

}