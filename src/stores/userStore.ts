import {action, observable, set} from "mobx";
import { Auth } from "../agent";
import {User, Error} from "../model";
import {AuthStore} from "../stores";




export class UserStore{
  @observable currentUser:User = null;
  @observable settingUser:User = null;
  @observable loadingUser:boolean;



  @action
  loggedUser(res) {
    // 최초 로그인 때만 활용하는 함수
    this.loadingUser = true;
    const {data: {user}} = res;
    this.currentUser = user;
    this.settingUser = user;
    this.loadingUser = false;
  }

  @action
  async pullUser() {
    try {
      this.loadingUser = true;
      const res = await Auth.current();
      const ret = res.status === 200;
      if (ret) {
        this.currentUser = res.data.user;
        this.settingUser = res.data.user;
      }
    }
    catch (e) {
      console.log(e);
    }
    finally {
      this.loadingUser = false;
    }
  }

  @action
  async pushUser() {
    try {
      this.loadingUser = true;
      const res = await Auth.update(this.settingUser);
      const ret = res.status === 200;
      if (ret) {
        for ( const [key, value] of Object.entries(this.settingUser)) {
          if (this.currentUser[key] !== this.settingUser[key]) {
            this.currentUser[key] = value;
          }
        }
        console.log(this.currentUser);
        return null;
      }
      else {
        return res.data.errors;
      }
    }
    catch (e) {
      console.log(e);
    }
    finally {
      this.loadingUser = false;
    }
  }

  @action forgetUser() {
    this.currentUser = null;
    this.settingUser = null;

  }

  private static instance:UserStore;

  public static getInstance() {
    return this.instance || (this.instance = new this());
  }
}
