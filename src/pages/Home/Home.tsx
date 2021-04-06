import React from 'react';
import {Link, RouteComponentProps} from 'react-router-dom';
import {ArticleStore, AuthStore, MainStore, UserStore} from "../../stores";
import { Banner, Feed, Tag } from "../../components";
import {observer} from "mobx-react";
import styles from "./home.module.less";

interface Props extends RouteComponentProps {

}

const userStore = UserStore.getInstance();
const articleStore = ArticleStore.getInstance();

@observer
class Home extends React.Component<Props> {
  render() {
    return (
      <div className="home-page">
        {!userStore.currentUser && <Banner/>}
        <div className={"container"}>
          <div className={styles.row}>
            {<Feed />}
            {<Tag/>}
          </div>
        </div>
      </div>
    );
  }

  async componentDidMount() {
    const params = this.props.location.search;
    await articleStore.setArticleList(params);
    await articleStore.setPopularTags();
  }

  async componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any) {
    if (prevProps.location.search !== this.props.location.search) {
      await articleStore.setArticleList(this.props.location.search);
    }
  }
}

export default Home;
