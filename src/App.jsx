import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Profile from "./Profile";
import Login from "./Login";
// import Planner from "./Planner";
import Main from "./mainpage";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Login />
        </Route>
        <Route exact path="/main" component={Main} />
      </Switch>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.
