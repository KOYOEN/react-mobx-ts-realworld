import React from 'react';
import { Link } from "react-router-dom";
import { Auth } from "../../agent";
import {User} from "../../model";

import { MainStore } from "../../stores";

import styles from "./login.module.less";
import {AxiosError, AxiosResponse} from "axios";


class Login extends React.Component {

  handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    const email = target.email.value || '';
    const password = target.password.value || '';

    if (email == '' || password == '') {
      return;
    }

    const userInfo:User = {
      user: {
        email: email,
        password: password,
      }
    }

    console.log(Auth.login(userInfo));
    Auth.login(userInfo)
      .then((res: AxiosResponse) => {
        MainStore.setToken(res.data.user.token);

        console.log("check");
      })
      .catch((err: AxiosError) => {
        console.log(err);
        console.log("No!")
      });
  }

  render() {
    return (
      <div className={styles['auth-page']}>
        <div className={styles['container']}>
          <div className={styles['row']}>
            <h1 className={styles['text-xs-center']}>Sign In</h1>
            <p className={styles['text-xs-center']}>
              <Link to={'/register'}>Need an account?</Link>
            </p>
            <form onSubmit={this.handleSubmit}>
              <input className={styles['form-input']} type="text" name="email" placeholder={"Email"}/>
              <input className={styles['form-input']} type="password" name="password" placeholder={"Password"}/>
              <button className={styles['form-btn']}>Sign in</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;