import { observable, action } from "mobx";

export default class mainStore {
  @observable private static instance: mainStore;

  private constructor() {}

  public static getInstance() {
    return this.instance || (this.instance = new this());
  }
}
