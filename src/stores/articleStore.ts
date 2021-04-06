import {ArticleRequest, MultipleArticle, TagList} from "../model";
import {action, observable} from "mobx";
import {Article, Tags} from "../agent";
import {AxiosResponse} from "axios";

export class ArticleStore {
  @observable articleData: MultipleArticle = null;
  @observable currentList: string;
  @observable tabList: [];
  @observable popularTags: TagList = null;
  @observable selectedTab:string = "global";

  @action
  async setArticleList(params: string) {
    const res = await Article.getFeedList(params);
    const ret = res.status === 200;
    if (ret) {
      this.articleData = res.data;
    }else {
      return res.data.errors;
    }
  }
  @action
  async setPopularTags() {
    const res = await Tags.getAll();
    if (res.status === 200) {
      this.popularTags = res.data;
    }else {
      return res.data.errors;
    }
  }

  private static instance: ArticleStore;

  public static getInstance() {
    return this.instance || (this.instance = new this());
  }
}