import React from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
import {ArticleStore, AuthStore, MainStore, UserStore} from "../../stores";
import { Banner, Feed, Tag } from "../../components";
import {Disposer, observer} from "mobx-react";
import styles from "./home.module.less";
import {observable, reaction, runInAction} from "mobx";

interface Props extends RouteComponentProps {

}

const mainStore = MainStore.getInstance();
const userStore = UserStore.getInstance();
const articleStore = ArticleStore.getInstance();

@observer
export class Home extends React.Component<Props> {

  disposer: Disposer;

  render() {
    return (
      <div className="home-page">
        {!mainStore.token && <Banner/>}
        <div className={"container"}>
          <div className={styles.row}>
            {<Feed {...this.props}/>}
            {<Tag/>}
          </div>
        </div>
      </div>
    );
  }

  componentDidMount() {
    articleStore.setPopularTags();
    this.disposer = reaction(() => this.props.location.search,
      text => {
        if (mainStore.token === null) {
          // 로그인 되지 않은 상태
          this.props.history.push('/?feed=global&offset=0')
        }else if (text === '') {
          // 로그인된 상태, 아무것도 없이 들어오는 경우
          this.props.history.push(`/?feed=personal&offset=0`);
        }
        runInAction(() => {
          articleStore.getArticleList(text);
        })
      }, {fireImmediately: true});
  }

  componentWillUnmount() {
    this.disposer();
  }
}

