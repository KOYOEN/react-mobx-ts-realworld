import React from "react";
import styles from "./article.module.less";
import {SingleArticle} from "../../model";
import {UserStore} from "../../stores";
import { Comment } from "./../../components";


const userStore = UserStore.getInstance();

export class ArticleComment extends React.Component {

  render() {
    return (userStore.currentUser) && (
      <section className={"row"}>
        <div className={styles.col} >
          <Comment />
        </div>
      </section>
    );
  }
}