import React from 'react';
import {
  Switch,
  Route
} from 'react-router-dom';
import { Home } from './pages/Home';
import {Nav} from "./components/Nav";
// import Settings from './pages/Settings';
// import Editor from './pages/Editor';
// import Login from './pages/Login';
// import Register from './pages/Register';
// import Nav from './components/Nav';

class App extends React.Component {

  render() {
    return (
      <div>
        <Nav />
        <Switch>
          {/*<Route path={"/register"} component={Register}/>*/}
          {/*<Route path={"/login"} component={Login}/>*/}
          {/*<Route path={"/editor"} component={Editor}/>*/}
          {/*<Route path={"/settings"} component={Settings}/>*/}
          <Route path={"/"} component={Home}/>
        </Switch>
      </div>
    );
  }
}

export default App;