import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import { Home, Login, Register, Settings, Editor } from "./pages";
import { Nav } from "./components";
import {MainStore, UserStore} from "./stores";

const mainStore = MainStore.getInstance();
const userStore = UserStore.getInstance();

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route path={"/register"} component={Register}/>
          <Route path={"/settings"} component={Settings}/>
          <Route path={"/login"} component={Login} />
          <Route path={"/editor"} component={Editor}/>
          <Route path={"/"} component={Home}/>
        </Switch>
      </div>
    );
  }

  componentDidMount() {
    userStore.pullUser();
  }
}

export default App;