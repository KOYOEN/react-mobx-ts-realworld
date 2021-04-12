import React from "react";
import {SingleArticle} from "../../model";
import {computed} from "mobx";
import styles from "./article.module.less";
import {ArticleStore} from "../../stores";
import {ArticleComment} from "./ArticleComment";


const articleStore = ArticleStore.getInstance();

export class ArticleMain extends React.Component {

  @computed
  get renderTagList() {
    return articleStore.currentArticle.tagList.map( (tag, i) =>
      <li className={"styles.tag"}  key={i}>
        {tag}
      </li>
    )
  }

  render() {
    return (articleStore.currentArticle) && (
      <div className={"container page"}>
        <article className={styles.col}>
          <div>
            <p>{articleStore.currentArticle.body}</p>
          </div>
          <ul className={"styles.tagList"}>
            {this.renderTagList}
          </ul>
        </article>
        <hr />
        <ArticleComment />
      </div>
    );
  }
}