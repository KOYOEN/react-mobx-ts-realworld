import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import { Home, Login } from "./pages";
import { Nav } from "./components";
import {AuthStore, MainStore, UserStore} from "./stores";

interface Props {
  mainStore: MainStore,
  authStore: AuthStore,
  userStore: UserStore
}

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    const props:Props = {
      mainStore: MainStore.getInstance(),
      userStore: UserStore.getInstance(),
      authStore: AuthStore.getInstance()
    }
    return (
      <div>
        <Nav />
        <Switch>
          {/*<Route path={"/register"} component={Register}/>*/}
          <Route path={"/login"} component={Login} {...props}/>
          {/*<Route path={"/editor"} component={Editor}/>*/}
          {/*<Route path={"/settings"} component={Settings}/>*/}
          <Route path={"/"} component={Home} {...props}/>
        </Switch>
      </div>
    );
  }
}

export default App;