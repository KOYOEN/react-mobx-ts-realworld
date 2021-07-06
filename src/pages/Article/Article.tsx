import React from 'react';
import {observable} from "mobx";
import {SingleArticle} from "../../model";
import {ArticleBanner} from "./ArticleBanner";
import {ArticleMain} from "./ArticleMain";
import {ArticleComment} from "./ArticleComment";
import {RouteComponentProps} from "react-router-dom";
import {ArticleStore} from "../../stores";
import {observer} from "mobx-react";

interface Props extends RouteComponentProps {
  match
}

const articleStore = ArticleStore.getInstance();

@observer
export class Article extends React.Component<Props> {

  render() {
    return (articleStore.currentArticle) && (
      <div className={"articlePage"}>
        <ArticleBanner />
        <ArticleMain />
      </div>
    );
  }

  componentDidMount() {
    articleStore.getArticle(this.props.match.params.slug);
  }
}

