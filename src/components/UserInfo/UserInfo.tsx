import React from "react";
import styles from "./userInfo.module.less";
import {SingleArticle} from "../../model";

interface Props {
  article :SingleArticle,
  isArticlePage : boolean,
}
export class UserInfo extends React.Component<Props> {
  render() {
    return (
      <div className={styles.wrapUserInfo}>
        <a href={this.props.article.author.username}>
          <img className={styles.imgProfile} src={this.props.article.author.image}/>
        </a>
        <div className={styles.info}>
          <a className={this.props.isArticlePage ? styles.lightA : ""} href={this.props.article.author.username} >{this.props.article.author.username}</a>
          <span className={this.props.isArticlePage ? styles.lightSpan: ""}>{new Date(this.props.article.createdAt).toDateString()}</span>
        </div>
      </div>
    );
  }
}