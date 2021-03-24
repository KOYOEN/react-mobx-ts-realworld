
const APIURL = "https://conduit.productionready.io/api";





const axios = require('axios');

const getUserToken = (email, password) => {
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

const Auth = {
  current: () => axios({
    method:'get',
    url: APIURL + "/user"
  }),
  login: (email, password) => axios({
    method: 'post',
    url: APIURL + "/users/login",
    data: {
      "user": {
        "email": email,
        "password": password,
      }
    }
  }),
  register: (username, email, password) => axios({
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
  update: (username, email, password, image, bio) => axios({
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


