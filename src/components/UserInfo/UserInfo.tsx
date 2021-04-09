import React from "react";
import styles from "../Feed/feed.module.less";
import {SingleArticle} from "../../model";

interface Props {
  article :SingleArticle
}
export class UserInfo extends React.Component<Props> {
  render() {
    return (
      <div className={styles.wrapUserInfo}>
        <a href={this.props.article.author.username}>
          <img className={styles.imgProfile} src={this.props.article.author.image}/>
        </a>
        <div className={styles.info}>
          <a href={this.props.article.author.username}>{this.props.article.author.username}</a>
          <span>{new Date(this.props.article.createdAt).toDateString()}</span>
        </div>
      </div>
    );
  }
}