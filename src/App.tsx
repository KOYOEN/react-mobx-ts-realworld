import React from 'react';
import {
  Switch,
  Route, RouteComponentProps
} from 'react-router-dom';
import { Home, Login, Register, Settings, Editor, Article } from "./pages";
import { Nav } from "./components";
import {MainStore, UserStore} from "./stores";

const mainStore = MainStore.getInstance();
const userStore = UserStore.getInstance();

class App extends React.Component<RouteComponentProps> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Nav />
        <Switch>
          <Route path={"/register"} component={Register} />
          <Route path={"/settings"} component={Settings} />
          <Route path={"/login"} component={Login} />
          <Route path={"/editor"} component={Editor} />
          <Route path={"/article/:slug"} component={Article} />
          <Route exact path={"/"} component={Home}/>
        </Switch>
      </div>
    );
  }

  componentDidMount() {
    userStore.pullUser();
  }
}

export default App;