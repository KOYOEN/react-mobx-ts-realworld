import React from "react";
import styles from "../Login/login.module.less";
import {Link, RouteComponentProps} from "react-router-dom";
import {computed, observable} from "mobx";
import {Error} from "../../components";
import {AuthStore} from "../../stores";

interface Props extends RouteComponentProps {

}

export class Register extends React.Component<Props> {
  @observable isSuccess: boolean = true;
  @computed
  get renderError() {
    if (this.isSuccess === true) {
      return null;
    }
    return <Error />;
  }

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    const username = target.username.value || '';
    const email = target.email.value || '';
    const password = target.password.value || '';
    const authStore = AuthStore.getInstance();
    if (email == '' || username == '' || password == '') {
      this.isSuccess = false;
      return;
    }
    authStore.setUsername(username);
    authStore.setEmail(email);
    authStore.setPassword(password);
    try {
      await authStore.register();
      if (this.isSuccess) {
        this.props.history.push('/');
      }
    } catch (e) {
      console.log(e);
    }
  }


  render() {
    return (
      <div className={"auth-page"}>
        <div className={'container'}>
          <div className={styles['row']}>
            <h1 className={styles['text-h1-center']}>Sign Up</h1>
            <p className={styles['text-p-center']}>
              <Link to={'/login'} className={styles['text-link-center']}>Have an account?</Link>
            </p>
            {this.renderError}
            <form onSubmit={this.handleSubmit}>
              <fieldset className={styles['form-group']}>
                <input className={styles['form-input']} type="text" name="username" placeholder={"Username"}/>
              </fieldset>
              <fieldset className={styles['form-group']}>
                <input className={styles['form-input']} type="email" name="email" placeholder={"Email"} value={"happy2473@gmail.com"}/>
              </fieldset>
              <fieldset className={styles['form-group']}>
                <input className={styles['form-input']} type="password" name="password" placeholder={"Password"}/>
              </fieldset>
              <button className={styles['form-btn']}>Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}