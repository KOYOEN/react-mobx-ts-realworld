import { User } from "./model"
const APIURL = "https://conduit.productionready.io/api";


const axios = require('axios');

export const getUserToken = ({user: {email, password}}: User) => {
  return axios({
    method: 'post',
    url: APIURL,
    data: {
      "user": {
        "email": email,
        "password": password
      }
    }
  });
}

export const Auth = {
  current: () => axios({
    method:'get',
    url: APIURL + "/user"
  }),
  login: ({user: {email, password}}: User) => axios({
    method: 'post',
    url: APIURL + "/users/login",
    data: {
      "user": {
        "email": email,
        "password": password,
      }
    }
  }),
  register: ({user: {username, email, password}}: User) => axios({
    method: 'post',
    url: APIURL + "/users",
    data: {
      "user":{
        "username": username,
        "email": email,
        "password": password,
      }
    }
  }),
  update: ({user: {username, email}}: User) => axios({
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

export default{
  getUserToken,
  Auth
};


