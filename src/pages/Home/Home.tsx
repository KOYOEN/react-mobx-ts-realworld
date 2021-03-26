import React from 'react';
import { UserStore } from "../../stores";
import { Banner } from "../../components";


class Home extends React.Component {
  render() {
    console.log(UserStore.getInstance());
    return (
      <div className="home-page">
        <Banner />
      </div>
    )
  }
}

export default Home;
