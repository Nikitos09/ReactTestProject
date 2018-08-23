// @flow
import * as React from 'react';
import { Switch } from 'react-router-dom';
import PrivateRoute from "./../../../components/routers/PrivateRoute";
import Home from "./../../../features/home";

export default (): React.Node => {
  return (
    <Switch>
      <PrivateRoute exact path="/home" component={Home} />
    </Switch>
  );
};