import {ArticleRequest, User} from "./model"
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
    try {
      return axios({
        method: 'get',
        url: APIURL + "/user"
      });
    } catch (error) {
      return error.response;
    }
  },
  login: async ({email, password}: User) => {
    try {
      return await axios({
        method: 'post',
        url: APIURL + "/users/login",
        data: {
          "user": {
            "email": email,
            "password": password,
          }
        }
      });
    } catch (error) {
      return error.response;
    }

  },
  register: async ({username, email, password}: User) => {
    try {
      return await axios({
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
    } catch (error) {
      return error.response;
    }
  },
  update: async ( {username, email, password, bio, image}: User) => {
    tokenPlugin();
    try {
      return await axios({
        method: 'put',
        url: APIURL + "/user",
        data: {
          "user": {
            "username": username,
            "email": email,
            "password": password,
            "bio": bio,
            "image": image,
          }
        }});
    }
    catch (error) {
      return error.response
    }
  }
}



export const Article = {
  getFeedList: async (params) => {
    try {
      return await axios({
        method: 'get',
        url: APIURL + `/articles/${params}?limit=10`,
      });
    } catch (error) {
      return error.reponse;
    }
  },
  getFeed: async () => {
    try {
      return await axios({
        method: 'get',
        url: APIURL + "/articles/feed",
      });
    } catch (error) {
      return error.response;
    }
  },
  getComments: async (slug) => {
    try {
      return await axios({
        method: 'get',
        url: APIURL + `/articles/${slug}/comments`,
      });
    } catch (error) {
      return error.response;
    }
  },
  deleteComments: async (slug) => {
    try {
      return await axios({
        method: 'delete',
        url: APIURL + `/articles/${slug}/comments/:id`,
      });
    } catch (error) {
      return error.response;
    }
  },
  setFavorite: async (slug) => {
    try {
      return await axios({
        method: 'post',
        url: APIURL + `/articles/${slug}/favorite`,
      })
    } catch (error) {
      return error.response;
    }
  }
}

export const Tags = {
  getAll: async() => {
    try {
      return await axios({
        method: 'get',
        url: APIURL + `/tags`,
      })
    } catch (error) {
      return error.response;
    }
  }
}

