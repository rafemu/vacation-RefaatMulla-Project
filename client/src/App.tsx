import React, { useEffect } from "react";
import "./App.css";
import { history } from "./_helprs/history";

import { PrivateRoute, PrivateAdminRoute } from "./components/PrivateRoute";

import VacationsPage from "./components/containers/pages/vacation-page";
import { LoginPage } from "./components/containers/pages/login-page";
import AdminPage from "./components/containers/pages/admin-page";
import NavBarApp from "./components/ui-component/nav-bar";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "./store/reducers/mainReducers";
import ACTIONS from "./store/actions";
import { RegisterPage } from "./components/containers/pages/register-page";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { IAlertState } from "./store/reducers/alertReducer";

export interface IAllState {
  mainReducer: IState;
  alertReducer: IAlertState;
}
function App() {
  const isLogedIn = useSelector(
    (state: IAllState) => state.mainReducer.currentUser.isLoggedIn
  );
  const alert = useSelector((state: IState) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      dispatch({ type: ACTIONS.ALERT_MESSAGE.CLEAR, payload: "" });
    });
  }, []);

  return (
    <Router>
      <div>
        {isLogedIn && <NavBarApp />}
        {alert && <div>{alert}</div>}
        <div>
          <Switch>
            <Route key="register" path="/register">
              <div className="vacationCard">
                <RegisterPage />
              </div>
            </Route>
            <PrivateRoute exact path="/home" component={VacationsPage} />
            <PrivateAdminRoute exact path="/admin" component={AdminPage} />
            <Route key="login" path="/">
              <div className="vacationCard">
                <LoginPage />
              </div>
            </Route>
            <Redirect from="*" to="/" />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
