import React from 'react';
import { Link } from "react-router-dom";
import {AuthStore, MainStore, UserStore} from "../../stores";
import styles from "./login.module.less";

interface Props {
  mainStore: MainStore,
  authStore: AuthStore,
  userStore: UserStore
}

export class Login extends React.Component<Props, {}> {

  constructor(props: Props) {
    super(props);
  }

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    const email = target.email.value || '';
    const password = target.password.value || '';
    const authStore = this.props.authStore;
    if (email == '' || password == '') {
      return;
    }
    authStore.setEmail(email);
    authStore.setPassword(password);
    try {
      await authStore.login();
    } catch (e) {
      console.log(e);
    } finally {
      // location.href = "/";
    }

  }

  render() {
    return (
      <div className={"auth-page"}>
        <div className={'container'}>
          <div className={styles['row']}>
            <h1 className={styles['text-h1-center']}>Sign In</h1>
            <p className={styles['text-p-center']}>
              <Link to={'/register'} className={styles['text-link-center']}>Need an account?</Link>
            </p>
            <form onSubmit={this.handleSubmit}>
              <fieldset className={styles['form-group']}>
                <input className={styles['form-input']} type="text" name="email" placeholder={"Email"}/>
              </fieldset>
              <fieldset className={styles['form-group']}>
                <input className={styles['form-input']} type="password" name="password" placeholder={"Password"}/>
              </fieldset>
              <button className={styles['form-btn']}>Sign in</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}