import React, { useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import css from "./style.module.css";
import { Card, CardActions, CardContent, Paper } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField/TextField";
import { registerUserAction } from "../../../../store/async-actions/authUser";
import { useSelector } from "react-redux";
import { IState } from "../../../../store/reducers/mainReducers";
import { Alert, AlertTitle } from "@material-ui/lab";
import { IUserRegister } from "../../../../interfaces";

export function RegisterPage() {
  const userFeild: IUserRegister = {
    userName: "",
    firstName: "",
    lastName: "",
    password: "",
  };

  const alert = useSelector((state: IState) => state.message);
  const [userDetails, setUserDetails] = useState(userFeild);

  function onChangeUserDetails(key: string, value: string) {
    setUserDetails({ ...userDetails, [key]: value });
  }

  async function sendRegisterReuqest() {
    console.log(userDetails);
    // if (!loginDetails.userName || !loginDetails.password) return;
    const result = await registerUserAction(userDetails);
    if (!result) return;
    // const { accessToken, message } = result;
    // if (message === "redirect" && accessToken) {
    //   window.location.reload();
    //   history.push("/home");
    // }
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
              <h2>Register please</h2>
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
                    onChangeUserDetails(
                      event?.target.name,
                      event?.target.value
                    );
                  }}
                />
                <TextField
                  className={css.textField}
                  label="Enter your First Name"
                  fullWidth
                  required
                  type="text"
                  name="firstName"
                  onChange={(event) => {
                    onChangeUserDetails(
                      event?.target.name,
                      event?.target.value
                    );
                  }}
                />
                <TextField
                  className={css.textField}
                  label="Enter your Last Name"
                  fullWidth
                  required
                  type="text"
                  name="lastName"
                  onChange={(event) => {
                    onChangeUserDetails(
                      event?.target.name,
                      event?.target.value
                    );
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
                    onChangeUserDetails(
                      event?.target.name,
                      event?.target.value
                    );
                  }}
                />
              </CardContent>
              <CardActions style={{ justifyContent: "space-between" }}>
                <Button
                  onClick={sendRegisterReuqest}
                  variant="contained"
                  color="secondary"
                >
                  Register
                </Button>
              </CardActions>
            </Card>
          </form>
        </Paper>
      </div>
    </div>
  );
}
