import {action, observable} from "mobx";
import agent from "../agent";
import mainStore from "./mainStore";

class AuthStore {
  private static instance: AuthStore;

  @observable inProgress = false;
  @observable errors = undefined;

  @observable values = {
    username: '',
    email: '',
    password: '',
  };

  constructor() {
  mainStore.getInstance()
  }

  @action
  setUsername(username) {
    this.values.username = username;
  }

  @action
  setEmail(email) {
    this.values.email = email;
  }

  @action
  setPassword(password) {
    this.values.password = password;
  }

  @action reset() {
    this.values.username = '';
    this.values.email = '';
    this.values.password = '';
  }

  @action login() {
    this.inProgress = true;
    this.errors = undefined;
    return agent.Auth.login(this.values.email, this.values.password)
      .then(({ user }) => mainStore.setToken(user.token))
      .catch(action((err) => {
        this.errors = err.response;
        throw err;
      }))
      .finally(action(() => {
        this.inProgress = false;
      }));
  }
  public static getInstance() {
    return this.instance || (this.instance = new this());
  }
}