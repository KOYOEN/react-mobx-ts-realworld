import React from "react";
import styles from "./article.module.less";
import {SingleArticle} from "../../model";
import {UserStore} from "../../stores";

interface Props {
  article: SingleArticle
}

const userStore = UserStore.getInstance();

export class ArticleComment extends React.Component<Props> {

  render() {
    return (
      <section className={"row"}>
        <div className={styles.col} >
          <form>
            <div className={styles.cardBlock}>
              <textarea
                name={"comment"}
                rows={3}
                placeholder={"Write a comment..."} />
            </div>
            <div className={styles.cardFooter}>
              <img src={userStore.currentUser.image} alt="userImg" />
              <button className={styles.btn} type={"submit"}>Post Comment</button>
            </div>
          </form>
        </div>
      </section>
    );
  }
}