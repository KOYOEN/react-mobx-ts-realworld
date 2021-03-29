import React from 'react';
import {AuthStore, MainStore, UserStore} from "../../stores";
import { Banner } from "../../components";
import {observer} from "mobx-react";

interface Props {
}

@observer
class Home extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <div className="home-page">
        <Banner />
      </div>
    )
  }
}

export default Home;
