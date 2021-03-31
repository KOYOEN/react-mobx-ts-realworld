import {action, observable, set} from "mobx";
import { Auth } from "../agent";
import {User, Error} from "../model";

export class UserStore {
  @observable currentUser:User;
  @observable loadingUser:boolean;


  @action
  loggedUser(res) {
    this.loadingUser = true;
    const {data: {user}} = res;
    this.currentUser = user;

    this.loadingUser = false;
  }

  @action
  async pullUser() {
    try {
      this.loadingUser = true;
      const {data: {user}} = await Auth.current();
      this.currentUser = user;
    }
    catch (e) {
      console.log(e);
    }
    finally {
      this.loadingUser = false;
    }
  }


  @action forgetUser() {
    this.currentUser = undefined;
  }

  private static instance:UserStore;

  public static getInstance() {
    return this.instance || (this.instance = new this());
  }
}