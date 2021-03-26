import {action, observable, set} from "mobx";
import { Auth } from "../agent";
import {User, Error} from "../model";
import {AxiosError, AxiosResponse} from "axios";

export class UserStore {
  private static instance:UserStore;
  @observable currentUser:User;
  @observable loadingUser:boolean;

  @observable errors:AxiosError;


  public static getInstance() {
    return this.instance || (this.instance = new this());
  }

  setUser = (user: User) => {
    const {bio, createdAt, email, id, image, token, updatedAt, username}:User = user;
    this.currentUser = {
      id,
      email,
      bio,
      image,
      token,
      username,
      createdAt,
      updatedAt
    };
  }



  @action async pullUser() {
    try {
      this.loadingUser = true;
      const {data: {user}} = await Auth.current();
      this.setUser(user);
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

}