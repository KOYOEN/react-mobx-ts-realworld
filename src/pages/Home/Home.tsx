import React from 'react';
import {AuthStore, MainStore, UserStore} from "../../stores";
import { Banner } from "../../components";

interface Props {
  mainStore: MainStore,
  authStore: AuthStore,
  userStore: UserStore
}


class Home extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    console.log(this.props.userStore);
    return (
      <div className="home-page">
        <Banner />
      </div>
    )
  }
}

export default Home;
