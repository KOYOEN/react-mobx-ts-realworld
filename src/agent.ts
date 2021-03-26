import { User } from "./model"
import { MainStore } from "./stores";
const APIURL = "https://conduit.productionready.io/api";

const mainStore = MainStore.getInstance();

const axios = require('axios');

const tokenPlugin = () => {
  if (mainStore.token) {
    axios.defaults.headers.common["Authorization"] = `Token ${mainStore.token}`;
  }
};

export const Auth = {
  current: () => {
    tokenPlugin();
    return axios({
      method:'get',
      url: APIURL + "/user"
    })
  },
  login: ({ email, password }: User) => {
    tokenPlugin();
    return axios({
      method: 'post',
      url: APIURL + "/users/login",
      data: {
        "user": {
          "email": email,
          "password": password,
        }
      }
    })
  },
  register: ({ username, email, password }: User) => {
    tokenPlugin();
    return axios({
      method: 'post',
      url: APIURL + "/users",
      data: {
        "user":{
          "username": username,
          "email": email,
          "password": password,
        }
      }
    })
  },
  update: ({ username, email }: User) => {
    tokenPlugin();
    return axios({
      method: 'put',
      url: APIURL + "/user",
      data: {
        "user": {
          "username": username,
          "email": email,
        }
      }
    })
  }
}



