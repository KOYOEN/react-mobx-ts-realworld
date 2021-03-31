import { User } from "./model"
import { MainStore } from "./stores";
import {AxiosError, AxiosResponse} from "axios";
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
      method: 'get',
      url: APIURL + "/user"
    })
      .then((res:AxiosResponse) => { return res; })
      .catch((error:AxiosError) => {
        console.log(error.response);
        return alert('알 수 없는 오류가 발생했습니다. 다시 로그인 브탁드립니다.');
      });
  },
  login: async ({email, password}: User) => {
    return await axios({
      method: 'post',
      url: APIURL + "/users/login",
      data: {
        "user": {
          "email": email,
          "password": password,
        }
      }})
      .then((res:AxiosResponse<any>) => { return res; })
      .catch((error:AxiosError) => { return error.response; })


  },
  register: async ({username, email, password}: User) => {
    return await axios({
      method: 'post',
      url: APIURL + "/users",
      data: {
        "user": {
          "username": username,
          "email": email,
          "password": password,
        }
      }})
      .then((res:AxiosResponse<any>) => { return res; })
      .catch((error) => { return error.response; })
  },
  update: async ({ username, email }: User) => {
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



