import React from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import VacationsPage from "./components/containers/pages/vacation-page";
import { LoginPage } from "./components/containers/pages/login-page";
import AdminPage from "./components/containers/pages/admin-page";
import NavBarApp from "./components/ui-component/nav-bar";
import { useSelector } from "react-redux";
import { IState } from "./store/reducers/mainReducers";

function App() {
  const isLogedIn = useSelector(
    (state: IState) => state.currentUser.isLoggedIn
  );

  return (
    <Router>
      <div>
        {isLogedIn && <NavBarApp />}

        <div>
          <Switch>
            {/* <Route key="CreateAccount" path="/CreateAccount">
                <Register />
              </Route> */}
            {/* {!isLogedIn && <Redirect to="/" />} */}
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
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
