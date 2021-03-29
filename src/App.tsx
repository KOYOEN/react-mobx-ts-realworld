import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import { Home, Login, Register } from "./pages";
import { Nav } from "./components";


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
          <Route path={"/login"} component={Login} />
          {/*<Route path={"/editor"} component={Editor}/>*/}
          {/*<Route path={"/settings"} component={Settings}/>*/}
          <Route path={"/"} component={Home}/>
        </Switch>
      </div>
    );
  }
}

export default App;