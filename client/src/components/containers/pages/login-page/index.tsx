import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardActions,
  TextField,
  Button,
  Paper,
  InputAdornment,
} from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import css from "./style.module.css";
import NameIcon from "@material-ui/icons/SupervisorAccount";
import LockIcon from "@material-ui/icons/Lock";

import { LoginAction } from "../../../../store/async-actions/authUser";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { Alert } from "@material-ui/lab";
import { IAllState } from "../../../../App";
import { Formik, Form } from "formik";
import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  userName: Yup.string()
    .required("User Name is required")
    .min(3, "User Name Too Short!")
    .max(250, "User Name Too Long!"),
  password: Yup.string().required("password is required"),
});

export function LoginPage() {
  const history = useHistory();

  const userFeild: any = {
    userName: "",
    password: "",
  };

  const [loginDetails, setUserLoginDetails] = useState(userFeild);
  const currentUser = useSelector(
    (state: IAllState) => state.mainReducer.currentUser
  );
  const alert = useSelector((state: IAllState) => state.alertReducer);

  function onChangeUserLoginDetails(key: string, value: string) {
    setUserLoginDetails({ ...loginDetails, [key]: value });
  }

  useEffect(() => {
    if (currentUser.isLoggedIn === true) history.push("/home");
  }, []);

  async function sendLoginReuqest() {
    if (!loginDetails.userName || !loginDetails.password) return;
    const result = await LoginAction(loginDetails);
    if (!result) return;
    const { accessToken, message } = result;
    if (message === "redirect" && accessToken) {
      setTimeout(() => {
        window.location.reload();
        history.push("/home");
      }, 1500);
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
          <Formik
            initialValues={userFeild}
            onSubmit={sendLoginReuqest}
            validationSchema={LoginSchema}
            render={({
              isValid,
              values,
              handleBlur,
              handleChange,
              touched,
              errors,
            }) => {
              return (
                <Form>
                  <Card className={css.cardDiv}>
                    <h2>Login please</h2>
                    <CardContent>
                      <div className={css.alert}>
                        {alert.type === "error" && (
                          <Alert severity="error">
                            <strong>{alert.message}</strong>
                          </Alert>
                        )}
                        {alert.type === "success" && (
                          <Alert severity="success">
                            <strong>{alert.message}</strong>
                          </Alert>
                        )}
                      </div>

                      <TextField
                        id="userName"
                        name="userName"
                        label="user Name"
                        value={values.userName}
                        onChange={(e) => {
                          handleChange(e);
                          let userName = e.currentTarget.value;
                          onChangeUserLoginDetails(e?.target.name, userName);
                        }}
                        onBlur={handleBlur}
                        helperText={touched.userName ? errors.userName : ""}
                        error={touched.userName && Boolean(errors.userName)}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <NameIcon />
                            </InputAdornment>
                          ),
                        }}
                      />

                      <TextField
                        id="password"
                        label="password"
                        type="password"
                        name="password"
                        value={values.password}
                        onChange={(e) => {
                          handleChange(e);
                          let password = e.currentTarget.value;
                          onChangeUserLoginDetails(e?.target.name, password);
                        }}
                        onBlur={handleBlur}
                        helperText={touched.password ? errors.password : ""}
                        error={touched.password && Boolean(errors.password)}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position="start">
                              <LockIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </CardContent>
                    <CardActions style={{ justifyContent: "space-between" }}>
                      <Link to="/register">
                        <Button variant="contained" color="primary">
                          Register
                        </Button>
                      </Link>
                      <Button
                        disabled={!isValid}
                        onClick={sendLoginReuqest}
                        variant="contained"
                        color="secondary"
                      >
                        Login
                      </Button>
                    </CardActions>
                  </Card>
                </Form>
              );
            }}
          />
        </Paper>
      </div>
    </div>
  );
}
