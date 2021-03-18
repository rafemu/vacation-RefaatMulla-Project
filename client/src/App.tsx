import React from "react";
// import logo from "./logo.svg";
import "./App.css";
// import { Register } from './components/containers/pages/register';
// import { ChangePassword } from './components/containers/pages/changePassword';
// import AccountsPage from './components/containers/pages/accounts-page';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
// import NavBarApp from "./components/ui-component/nav-bar";
// import VacationCard from "./components/ui-component/vacation-card";
import VacationsPage from "./components/containers/pages/vacation-page";
import { LoginPage } from "./components/containers/pages/login-page";
import AdminPage from "./components/containers/pages/admin-page";
import NavBarApp from "./components/ui-component/nav-bar";
import { useSelector } from "react-redux";
import { IState } from "./store/reducers/mainReducers";
// import NavBarApp from './components/ui-component/nav-bar';
// import AccountPage from './components/containers/pages/account-page';
// import { Login } from './components/containers/pages/login';
// import jwt_decode from "jwt-decode";

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
