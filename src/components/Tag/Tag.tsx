import React from "react";
import {Link} from "react-router-dom";
import {ArticleStore} from "../../stores";
import {computed} from "mobx";
import styles from "./tag.module.less";
import {observer} from "mobx-react";

const articleStore = ArticleStore.getInstance();

@observer
export class Tag extends React.Component {
  @computed
  get renderPopularTags() {
    return articleStore.popularTags.tags.map( (tag, i) => {
      return <Link to={`/?feed=tag&tag=${tag}&offset=0`} className={"tag"} key={i}>{tag}</Link>
    });
  }
  render() {
    return (
      <section>
        <div className={styles.sidebar}>
          <p>Popular Tags</p>
          <div className={styles.tagList}>
            {articleStore.popularTags && this.renderPopularTags}
          </div>
        </div>
      </section>
    );
  }
}