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
  current: async () => {
    tokenPlugin();
    return axios({
      method:'get',
      url: APIURL + "/user"
    })
  },
  login: async ({ email, password }: User) => {
    try {
      const res = axios({
        method: 'post',
        url: APIURL + "/users/login",
        data: {
          "user": {
            "email": email,
            "password": password,
          }
        }
      });
      return res.data;
    }
    catch (e) {
      return e.errors;
    }
  },
  register: ({ username, email, password }: User) => {
    try {
      const res = axios({
        method: 'post',
        url: APIURL + "/users",
        data: {
          "user": {
            "username": username,
            "email": email,
            "password": password,
          }
        }
      });
      return res.data;
    }
    catch (e) {
      return e.errors;
    }
  },
  update: ({ username, email }: User) => {
    tokenPlugin();
    try {
      const res = axios({
        method: 'put',
        url: APIURL + "/user",
        data: {
          "user": {
            "username": username,
            "email": email,
          }
        }
      });
      return res.data;
    }
    catch (e) {
       return e.errors;
    }
  }
}



