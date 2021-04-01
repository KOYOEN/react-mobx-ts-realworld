import { action, observable } from "mobx";
import { Auth } from "../agent";
import {User} from "../model";
import {AxiosError, AxiosResponse} from "axios";
import {asyncAction} from "mobx-utils";
import {MainStore} from "./mainStore";
import {UserStore} from "./userStore";

const mainStore = MainStore.getInstance();
const userStore = UserStore.getInstance();

export class AuthStore {
  @observable inProgress: boolean = false;
  @observable errors: any = undefined;

  @observable values: User = {
    username: '',
    email: '',
    password: '',
  };

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
      const res = await Auth.login(this.values);
      const ret = res.status === 200;
      if (ret) {
        mainStore.setToken(res.data.user.token);
        userStore.loggedUser(res);
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
      this.inProgress = false;
    }
  }

  async register() {
    try {
      this.inProgress = true;
      this.errors = undefined;
      const res = await Auth.register(this.values);
      const ret = res.status === 200;
      if (ret) {
        mainStore.setToken(res.data.user.token);
        userStore.loggedUser(res);
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
      this.inProgress = false;
    }
  }

  @action
  logout() {
    mainStore.setToken(null);
    userStore.forgetUser();
  }

  private static instance: AuthStore;

  public static getInstance() {
    return this.instance || (this.instance = new this());
  }

}

