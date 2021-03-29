import { action, observable } from "mobx";
import { Auth } from "../agent";
import { MainStore } from "./mainStore";
import { UserStore } from "./userStore";
import {User} from "../model";
import {AxiosError, AxiosResponse} from "axios";
import {asyncAction} from "mobx-utils";

export class AuthStore {
  private static instance: AuthStore;

  @observable inProgress: boolean = false;
  @observable errors: any = undefined;

  @observable values: User = {
    username: '',
    email: '',
    password: '',
  };

  public static getInstance() {
    return this.instance || (this.instance = new this());
  }

  @action
  setUsername(username: string) {
    this.values.username = username;
  }

  @action
  setEmail(email: string) {
    this.values.email = email;
  }

  @action
  setPassword(password: string) {
    this.values.password = password;
  }

  @action reset() {
    this.values.username = '';
    this.values.email = '';
    this.values.password = '';
  }

  async login() {
    try {
      this.inProgress = true;
      this.errors = undefined;
      const mainStore = MainStore.getInstance();
      const userStore = UserStore.getInstance();
      const res = await Auth.login(this.values);
      if (res.status === 200) {
        mainStore.setToken(res.data.user.token);
        userStore.pullUser(res);
        return true;
      }
      else {
        return false;
      }
    }
    catch (e) {
      console.log(e);
    }
    finally {
      this.inProgress = false;
    }
  }

  async register() {
    try {
      this.inProgress = true;
      this.errors = undefined;
      const mainStore = MainStore.getInstance();
      const userStore = UserStore.getInstance();
      const res = await Auth.register(this.values);
      console.log(res);
      // if (res === 200) {
      //   mainStore.setToken(res.data.user.token);
      //   userStore.pullUser(res);
      //   return true;
      // }
      // else {
      //   return false;
      // }
    }
    catch (e) {
      console.log(e);
    }
    finally {
      this.inProgress = false;
    }
  }
}

