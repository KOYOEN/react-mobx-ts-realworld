import React from "react";
import {SingleArticle} from "../../model";
import {computed} from "mobx";
import styles from "./article.module.less";

interface Props {
  article: SingleArticle
}

export class ArticleMain extends React.Component<Props> {

  @computed
  get renderTagList() {
    return this.props.article.tagList.map( (tag, i) =>
      <li className={styles.tag}  key={i}>
        {tag}
      </li>
    )
  }

  render() {
    return (
      <div className={"container page"}>
        <article className={styles.col}>
          <div>
            <p>{this.props.article.body}</p>
          </div>
          <ul className={styles.tagList}>
            {this.renderTagList}
          </ul>
        </article>
      </div>
    );
  }
}