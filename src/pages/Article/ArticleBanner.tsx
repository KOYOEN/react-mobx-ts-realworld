import React from "react";
import styles from "./article.module.less";
import {UserInfo} from "../../components/UserInfo/UserInfo";
import {SingleArticle} from "../../model";
import {ArticleStore} from "../../stores";

const articleStore = ArticleStore.getInstance();

export class ArticleBanner extends React.Component {
  render() {
    return (articleStore.currentArticle) && (
      <header className={styles.banner}>
        <div className={"container"}>
          <h1>{articleStore.currentArticle.title}</h1>
          <UserInfo article={articleStore.currentArticle} isArticlePage={true} />
        </div>
      </header>
    );
  }
}