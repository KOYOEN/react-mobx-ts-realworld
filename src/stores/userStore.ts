import {action, observable, set} from "mobx";
import { Auth } from "../agent";
import {User, Error} from "../model";
import {AxiosError, AxiosResponse} from "axios";
import {asyncAction} from "mobx-utils";

export class UserStore {
  @observable currentUser:User;
  @observable loadingUser:boolean;

  @observable errors:AxiosError;



  pullUser(res) {
    try {
      this.loadingUser = true;
      const {data: {user}} = res;
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