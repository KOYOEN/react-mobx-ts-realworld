import {action, observable} from "mobx";
import agent from "../agent";
import {User, Error} from "../model";

class UserStore {
  @observable currentUser:User;
  @observable loadingUser:boolean;

  @observable errors:Error[] = undefined;


  @action
  pullUser() {
    this.loadingUser = true;
    return agent.Auth.current()
      .then(action(({ user }) => { this.currentUser = user; }))
      .catch((err) => this.errors = err)
      .finally(action(() => { this.loadingUser = false }));
  }


}