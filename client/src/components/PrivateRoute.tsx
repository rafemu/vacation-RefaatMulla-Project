import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getIsAdmin } from "../store/services/auth.service";

const PrivateRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
}> = (props) => {
  const condition = localStorage.getItem("VacationApp");

  return condition ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/login" />
  );
};

const PrivateAdminRoute: React.FC<{
  component: React.FC;
  path: string;
  exact: boolean;
}> = (props) => {
  const condition = getIsAdmin();

  return condition ? (
    <Route path={props.path} exact={props.exact} component={props.component} />
  ) : (
    <Redirect to="/login" />
  );
};

export { PrivateRoute, PrivateAdminRoute };
