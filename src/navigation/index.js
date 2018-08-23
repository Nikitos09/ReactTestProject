// @flow
import * as React from "react";
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from "./history";
import Auth from "./navigators/auth";
import Home from "./navigators/home";

export default (): React.Node => (
  <Router basename="/" history={history}>
    <Switch>
      <Redirect exact from="/" to="/home" />
      <Route path="/auth" component={Auth} />
      <Route path="/home" component={Home} />
    </Switch>
  </Router>
);
