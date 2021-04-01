import React from "react";
import styles from "./setting.module.less";
import {RouteComponentProps} from "react-router-dom";
import {AuthStore, UserStore} from "../../stores";
import {User} from "../../model";
import {computed, observable} from "mobx";
import {observer} from "mobx-react";
import {Error} from "../../components";

interface Props extends RouteComponentProps {

}

const userStore = UserStore.getInstance();
const authStore = AuthStore.getInstance();
// const settingStore = SettingStore.getInstance();


@observer
export class Settings extends React.Component<Props> {
  @observable statement: object = null;


  handleChange = (event:React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const target = event.currentTarget;
    userStore.settingUser[target.name] = target.value;
  }

  handleUpdate = async (event:React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    this.statement = await userStore.pushUser();
    if (this.statement === null) {
      this.props.history.push('/');
    }
  }

  handleLogout = (event:React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    authStore.logout();
    this.props.history.push('/');
  }

  @computed
  get renderError() {
    return this.statement && <Error statement={this.statement}/>;
  }

  render() {
    let user = userStore.settingUser;

    return (userStore.settingUser) &&
      (
       <div className={styles.settingPage} >
        <div className={styles.container} >
          <div className={styles.row} >
            <h1 className={styles.textH1Center}>Your Settings</h1>
            {this.renderError}
            <form>
              <fieldset className={styles.formGroup} >
                <input type="text"
                       name={"image"}
                       className={styles.formInput}
                       placeholder={"URL of profile picture"}
                       value={user.image}
                       onChange={this.handleChange}
                />
              </fieldset>
              <fieldset className={styles.formGroup} >
                <input type="text"
                       name={"username"}
                       className={styles.formInput}
                       placeholder={"Username"}
                       value={user.username}
                       onChange={this.handleChange}
                />
              </fieldset>
              <fieldset className={styles.formGroup} >
                <textarea className={styles.formTextArea}
                          name={"bio"}
                          placeholder={"Short bio about you"}
                          value={user.bio}
                          onChange={this.handleChange}
                />
              </fieldset>
              <fieldset className={styles.formGroup} >
                <input type="email"
                       className={styles.formInput}
                       placeholder={"Email"}
                       value={user.email}
                       onChange={this.handleChange}
                />
              </fieldset>
              <fieldset className={styles.formGroup} >
                <input type="password"
                       name={"password"}
                       className={styles.formInput}
                       placeholder={"New Password"}
                       value={user.password}
                       onChange={this.handleChange}
                />
              </fieldset>
              <button className={`${styles.btn} ${styles.formBtn}`} onClick={this.handleUpdate}>Update Settings</button>
            </form>
            <hr />
            <button className={styles.logoutBtn}  onClick={this.handleLogout}>Or click here to logout</button>
          </div>
        </div>
      </div>
    );
  }
  componentDidMount() {

  }
}

