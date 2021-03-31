import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import css from "./style.module.css";
import { Card, CardActions, CardContent, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField/TextField";
import { LoginAction } from "../../../../store/async-actions/authUser";
import { useSelector } from "react-redux";
import { IState } from "../../../../store/reducers/mainReducers";
import { useHistory } from "react-router-dom";
import { Alert, AlertTitle } from "@material-ui/lab";

export function LoginPage() {
  const userFeild: any = {
    userName: "",
    password: "",
  };
  const history = useHistory();

  const alert = useSelector((state: IState) => state.message);
  const [loginDetails, setChangePasswordDetails] = useState(userFeild);
  const currentUser = useSelector((state: IState) => state.currentUser);

  function onChangePassword(key: string, value: string) {
    setChangePasswordDetails({ ...loginDetails, [key]: value });
  }

  useEffect(() => {
    if (currentUser.isLoggedIn == true) history.push("/home");
  }, []);

  async function sendLoginReuqest() {
    if (!loginDetails.userName || !loginDetails.password) return;
    const result = await LoginAction(loginDetails);
    if (!result) return;
    const { accessToken, message } = result;
    if (message === "redirect" && accessToken) {
      window.location.reload();
      history.push("/home");
    }
  }

  return (
    <div>
      <div className={css.grow}>
        <AppBar className={css.appBar} position="static">
          <div className={css.wrapper}>
            <div className={css.header}>- Welcom to Vacation App - </div>
          </div>
        </AppBar>
      </div>
      <div className={css.loginDiv}>
        <Paper>
          <form>
            <Card className={css.cardDiv}>
              <h2>Login please</h2>
              <CardContent>
                <div>
                  {alert && (
                    <Alert severity="error">
                      <AlertTitle>Error</AlertTitle>
                      <strong>{alert}</strong>
                    </Alert>
                  )}
                </div>
                <TextField
                  className={css.textField}
                  label="Enter your User Name"
                  fullWidth
                  required
                  type="text"
                  name="userName"
                  onChange={(event) => {
                    onChangePassword(event?.target.name, event?.target.value);
                  }}
                />
                <TextField
                  className={css.textField}
                  label="Enter your password"
                  fullWidth
                  required
                  type="password"
                  name="password"
                  onChange={(event) => {
                    onChangePassword(event?.target.name, event?.target.value);
                  }}
                />
              </CardContent>
              <CardActions style={{ justifyContent: "space-between" }}>
                <Button
                  onClick={sendLoginReuqest}
                  variant="contained"
                  color="secondary"
                >
                  Login
                </Button>
              </CardActions>
            </Card>
          </form>
        </Paper>
      </div>
    </div>
  );
}
