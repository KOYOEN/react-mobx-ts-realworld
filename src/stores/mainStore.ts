import {observable, action, reaction} from "mobx";

export class MainStore {
  private static instance: MainStore;
  @observable appName = 'Conduit';
  @observable token = window.localStorage.getItem('jwt');


  private constructor() {
    reaction(
      () => this.token,
      token => {
        if (token) {
          window.localStorage.setItem('jwt', token);
        } else {
          window.localStorage.removeItem('jwt');
        }
      }
    );
  }

  static getInstance() {
    return this.instance || (this.instance = new this());
  }

  @action
  setToken (token: string) {
    this.token = token;
  }
}


