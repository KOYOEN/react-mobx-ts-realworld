import { action, observable } from "mobx";
import { Auth } from "../agent";
import { MainStore } from "./mainStore";
import { UserStore } from "./userStore";
import {User} from "../model";
import {AxiosError, AxiosResponse} from "axios";
import {asyncAction} from "mobx-utils";

const mainStore = MainStore.getInstance();
const userStore = UserStore.getInstance();

export class AuthStore {
  private static instance: AuthStore;

  @observable inProgress: boolean = false;
  @observable errors: any = undefined;

  @observable statement: object;

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
    this.inProgress = true;
    this.errors = undefined;
    const res = await Auth.login(this.values);
    const ret = res.status === 200;
    if (ret) {
      mainStore.setToken(res.data.user.token);
      userStore.pullUser(res);

    }
    else {
      this.statement = res.data.errors;

    }
    this.inProgress = false;
    return ret;
  }

  async register() {
    this.inProgress = true;
    this.errors = undefined;
    const res = await Auth.register(this.values);
    const ret = res.status === 200;
    if (ret) {
      mainStore.setToken(res.data.user.token);
      userStore.pullUser(res);

    } else {
      this.statement = res.data.errors;

    }
    this.inProgress = false;
    return ret;
  }
}

