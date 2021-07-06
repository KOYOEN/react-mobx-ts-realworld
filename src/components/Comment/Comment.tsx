import React from "react";
import styles from "./comment.module.less";
import {ArticleStore, UserStore} from "../../stores";
import {RouteComponentProps} from "react-router-dom";

const userStore = UserStore.getInstance();
const articleStore = ArticleStore.getInstance();

interface Props extends RouteComponentProps {
  match
}

export class Comment extends React.Component<Props> {
  handleDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  }

  handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    articleStore.addComment(this.props.match.params.slug, target.comment.value);
  }

  renderComments() {
    if (articleStore.currentComments.comments.length === 0) {
      return null;
    }
    return (
      articleStore.currentComments.comments.map( (comment) => {
        const isMyComment = comment.author.username === userStore.currentUser.username;
        return (
          <div className={styles.cardFooter}>
            <img src={comment.author.image} alt="userImg"/>
            <button
              className={`${styles.btnDelete} ${!isMyComment ? styles.noDisplay : ""}`}
              type={"submit"}
              onClick={this.handleDelete} />
          </div>
        );
      })
    );
  }
  render() {
    if (!userStore.currentUser) {
      return <div>Sign in or sign up to add comments on this article.</div>
    }
    return (
      <form>
        <div className={styles.cardBlock}>
              <textarea
                name={"comment"}
                rows={3}
                placeholder={"Write a comment..."} />
        </div>
        <div className={styles.cardFooter}>
          <img src={userStore.currentUser.image} alt="userImg"/>
          <button className={styles.btnSubmit} type={"submit"} onClick={this.handleSubmit}>Post Comment</button>
        </div>
        {this.renderComments}
      </form>
    );
  }
}