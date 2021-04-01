import React from "react";
import styles from "../Register/register.module.less";
import {Link, RouteComponentProps} from "react-router-dom";
import {computed, observable} from "mobx";
import {Error} from "../../components";
import {AuthStore} from "../../stores";
import {observer} from "mobx-react";

interface Props extends RouteComponentProps {

}

const authStore = AuthStore.getInstance();

@observer
export class Register extends React.Component<Props> {
  @observable statement:object = null;

  constructor(props) {
    super(props);
  }

  @computed
  get renderError() {
    return this.statement && <Error statement={this.statement}/>;
  }

  handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.currentTarget;
    const username = target.username.value || '';
    const email = target.email.value || '';
    const password = target.password.value || '';


    authStore.setUsername(username);
    authStore.setEmail(email);
    authStore.setPassword(password);

    this.statement = await authStore.register();
    if (this.statement === null) {
      this.props.history.push('/');
    }
  }


  render() {
    return (
      <div className={"auth-page"}>
        <div className={'container'}>
          <div className={styles.row}>
            <h1 className={styles.textH1Center}>Sign Up</h1>
            <p className={styles.textPCenter}>
              <Link to={'/login'} className={styles.textLinkCenter}>Have an account?</Link>
            </p>
            {this.renderError}
            <form onSubmit={this.handleSubmit}>
              <fieldset className={styles.formGroup}>
                <input className={styles.formInput} type="text" name="username" placeholder={"Username"}/>
              </fieldset>
              <fieldset className={styles.formGroup}>
                <input className={styles.formInput} type="email" name="email" placeholder={"Email"} />
              </fieldset>
              <fieldset className={styles.formGroup}>
                <input className={styles.formInput} type="password" name="password" placeholder={"Password"}/>
              </fieldset>
              <button className={styles.formBtn}>Sign Up</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}