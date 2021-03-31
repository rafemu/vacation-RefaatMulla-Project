import React, { useEffect } from "react";
import "./App.css";
import { history } from "./_helprs/history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

// import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import VacationsPage from "./components/containers/pages/vacation-page";
import { LoginPage } from "./components/containers/pages/login-page";
import AdminPage from "./components/containers/pages/admin-page";
import NavBarApp from "./components/ui-component/nav-bar";
import { useDispatch, useSelector } from "react-redux";
import { IState } from "./store/reducers/mainReducers";
import ACTIONS from "./store/actions";

function App() {
  const isLogedIn = useSelector(
    (state: IState) => state.currentUser.isLoggedIn
  );
  const alert = useSelector((state: IState) => state.message);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location, action) => {
      // clear alert on location change
      dispatch({ type: ACTIONS.ALERT_MESSAGE.CLEAR, payload: "" });
    });
  }, []);
  if (isLogedIn === false) {
    history.push("/");
  }

  return (
    <Router history={history}>
      <div>
        {isLogedIn && <NavBarApp />}
        {alert && <div>{alert}</div>}
        <div>
          <Switch>
            <Route key="admin" path="/admin">
              <div className="vacationCard">
                <AdminPage />
              </div>
            </Route>
            <Route key="home" path="/home">
              <div className="vacationCard">
                <VacationsPage />
              </div>
            </Route>
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
