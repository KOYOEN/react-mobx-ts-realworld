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
    if (this.instance) {
      console.log("main_aged");
    } else {
      console.log("main_new");
    }
    return this.instance || (this.instance = new this());
  }

  @action
  setToken (token: string) {
    this.token = token;
  }
}


