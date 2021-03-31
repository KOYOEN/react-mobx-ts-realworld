import React from 'react';
import {Link, RouteComponentProps } from "react-router-dom";
import {AuthStore, MainStore, UserStore} from "../../stores";
import styles from "./login.module.less";
import {observer} from "mobx-react";
import {action, computed, observable} from "mobx";
import {Error} from "../../components";

interface Props extends RouteComponentProps {

}

const authStore = AuthStore.getInstance();

@observer
export class Login extends React.Component<Props> {
  @observable isSuccess: boolean = true;

  constructor(props: Props) {
    super(props);
    authStore.statement = {};
  }

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
    const email = target.email.value || '';
    const password = target.password.value || '';

    authStore.setEmail(email);
    authStore.setPassword(password);

    this.isSuccess = await authStore.login();
    if (this.isSuccess) {
      this.props.history.push('/')
    }
  }

  render() {
    return (
      <div className={"auth-page"}>
        <div className={'container'}>
          <div className={styles.row}>
            <h1 className={styles.textH1Center}>Sign In</h1>
            <p className={styles.textPCenter}>
              <Link to={'/register'} className={styles.textLinkCenter} >Need an account?</Link>
            </p>
            {this.renderError}
            <form onSubmit={this.handleSubmit}>
              <fieldset className={styles.formGroup}>
                <input className={styles.formInput} type="email" name="email" placeholder={"Email"} />
              </fieldset>
              <fieldset className={styles.formGroup}>
                <input className={styles.formInput} type="password" name="password" placeholder={"Password"} />
              </fieldset>
              <button className={styles.formBtn}>Sign in</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}