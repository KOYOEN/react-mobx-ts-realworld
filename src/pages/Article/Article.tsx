import React from 'react';
import styles from "../Settings/setting.module.less";
import {observable} from "mobx";
import {SingleArticle} from "../../model";
import {UserInfo} from "../../components/UserInfo/UserInfo";
import {ArticleBanner} from "./ArticleBanner";
import {ArticleMain} from "./ArticleMain";

export class Article extends React.Component {
  @observable article:SingleArticle;

  render() {
    return (
      <div className={"articlePage"}>
        <ArticleBanner article={this.article} />
        <ArticleMain article={this.article} />
        <hr />
        
      </div>
    );
  }

}

