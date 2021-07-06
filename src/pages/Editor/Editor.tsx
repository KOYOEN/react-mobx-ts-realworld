import React, {FormEvent} from "react";
import styles from "./editor.module.less";
import {computed, observable} from "mobx";
import {Error} from "../../components";
import {ArticleStore, AuthStore, UserStore} from "../../stores";
import {RouteComponentProps} from "react-router-dom";
import {Article} from "../../agent";
import {SingleArticle} from "../../model";

const userStore = UserStore.getInstance();
const authStore = AuthStore.getInstance();
const articleStore = ArticleStore.getInstance();

interface Props extends RouteComponentProps {}

export class Editor extends React.Component<Props> {
  @observable statement: object = null;
  @observable article: SingleArticle = {
    body: "",
    description: "",
    tagList: [],
    title: "",
  };

  handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    this.statement = Article.createArticle(this.article);
  }

  handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const target = event.currentTarget;
    const tagValue = target.value;
    if (event.key === 'Enter' && tagValue.trim() !== ''){
      this.article.tagList.push(tagValue);
      event.currentTarget.value = "";
    }
  }

  @computed
  get renderTagList() {
    return this.article.tagList.map( (tag, i) =>
      <span className={styles.tagList} key={i}>
        <i className={styles.delIcon}/>
        {tag}
      </span>
    );
  }

  @computed
  get renderError() {
    return this.statement && <Error statement={this.statement}/>;
  }

  render() {
    return (
      <section className={"container page"}>
        <div className={"row"}>
          <div className={styles.col}>
            {this.renderError}
            <form>
              <fieldset className={styles.formGroup}>
                <input type={"text"}
                       name={"titleInput"}
                       className={styles.formInput}
                       value={this.article.title}
                       placeholder={"Article Title"}
                />
              </fieldset>
              <fieldset className={styles.formGroup}>
                <input type={"text"}
                       name={"description"}
                       className={styles.formInput}
                       value={this.article.description}
                       placeholder={"What's this article about?"}
                />
              </fieldset>
              <fieldset className={styles.formGroup}>
                <textarea className={styles.formTextArea}
                          name={"body"}
                          value={this.article.body}
                          placeholder={"Write your article(in markdown)"}
                />
              </fieldset>
              <fieldset className={styles.formGroup}>
                <input type={"text"}
                       name={"tagList"}
                       className={styles.formInput}
                       placeholder={"Enter tags"}
                       onKeyPress={this.handleKeyPress}
                />
                <div className={styles.tagList} />
              </fieldset>
              <button
                className={`${styles.btn} ${styles.formBtn}`}
                onClick={this.handleSubmit}
              >Update Settings
              </button>
            </form>
          </div>
        </div>
      </section>
    );
  }

  componentDidMount() {
    const path = this.props.location.pathname;
    const slug = path.split('/')[-1];
    if (slug === 'editor') {
      // New Post 접근시
      return;
    }
    const res = articleStore.getArticle(slug);
    res.then((article:SingleArticle) => {
      for ( const [key, value] of Object.entries(article)) {
        this.article[key] = value;
      }
    });
  }
}

