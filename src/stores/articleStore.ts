import {ArticleRequest, MultipleArticle, SingleArticle, TagList} from "../model";
import {action, observable} from "mobx";
import {Article, Tags} from "../agent";


export class ArticleStore {
  @observable articleListData: MultipleArticle = null;
  @observable currentList: string;
  @observable tabList: [];
  @observable popularTags: TagList = null;
  @observable selectedTab:string = 'global';
  @observable offset: number = 0;
  @observable tag: string = '';


  @action
  async getArticleList(paramsString: string) {
    const searchParams = new URLSearchParams(paramsString);
    this.selectedTab = searchParams.get('feed') || 'personal';
    this.offset = parseInt(searchParams.get('offset'));
    this.tag = searchParams.get('tag') || '';

    const req:ArticleRequest = {
      author: searchParams.get('author') || "",
      favorited: searchParams.get('favorited') || "",
      tag: searchParams.get('tag') || "",
      limit: searchParams.get('limit') || "10",
      offset: searchParams.get('offset') ||  "0"
    }
    let res = null;
    console.log(this.selectedTab);
    if (this.selectedTab === "global") {
      res = await Article.getGlobalList(req);
    }else if (this.selectedTab === "favorited") {
      res = await Article.getListByFavorited(req);
    }else if (this.selectedTab === "author") {
      res = await Article.getListByAuthor(req);
    }else if (this.selectedTab === "tag") {
      res = await Article.getListByTag(req);
    }else {
      res = await Article.getPersonalList(req);
    }

    const ret = res.status === 200;
    if (ret) {
      this.articleListData = res.data;
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

  @action
  async createArticle() {
    const article:SingleArticle = {
      title: "",
      description: "",
      body: "",
      tagList: [],
    }

    const res = await Article.createArticle(article);
    if (res.status === 200) {
      return true;
    }else {
      console.log(res.data.errors)
      return false;
    }
  }

  @action
  async getArticle(slug: string):Promise<SingleArticle> {

    const res = await Article.getArticle(slug);
    if (res.status === 200) {
      return res.data.article;
    }else {
      console.log(res.data.errors);
      return res.data.errors;
    }
  }


  private static instance: ArticleStore;

  public static getInstance() {
    return this.instance || (this.instance = new this());
  }
}