import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import { Home, Login } from "./pages";
import { Nav } from "./components"
import { UserStore } from "./stores"

class App extends React.Component {

  render() {
    return (
      <div>
        <Nav />
        <Switch>
          {/*<Route path={"/register"} component={Register}/>*/}
          <Route path={"/login"} component={Login}/>
          {/*<Route path={"/editor"} component={Editor}/>*/}
          {/*<Route path={"/settings"} component={Settings}/>*/}
          <Route path={"/"} component={Home}/>
        </Switch>
      </div>
    );
  }
}

export default App;