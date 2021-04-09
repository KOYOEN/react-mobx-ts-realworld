import React from "react";
import styles from "../Settings/setting.module.less";
import {UserInfo} from "../../components/UserInfo/UserInfo";
import {SingleArticle} from "../../model";

interface Props{
  article :SingleArticle
}

export class ArticleBanner extends React.Component<Props> {
  render() {
    return (
      <header className={styles.banner}>
        <div className={"container"}>
          <h1>{this.props.article.title}</h1>
          <UserInfo article={this.props.article} />
        </div>
      </header>
    );
  }
}