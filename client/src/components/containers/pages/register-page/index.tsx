import React, { useEffect, useState } from "react";
import AppBar from "@material-ui/core/AppBar";
import css from "./style.module.css";
import {
  Card,
  CardActions,
  CardContent,
  InputAdornment,
  Paper,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField/TextField";
import { registerUserAction } from "../../../../store/async-actions/authUser";
import { useDispatch, useSelector } from "react-redux";
import { Alert } from "@material-ui/lab";
import { IUserRegister } from "../../../../interfaces";
import { IAllState } from "../../../../App";
import { Link, useHistory } from "react-router-dom";
import ACTIONS from "../../../../store/actions";
import NameIcon from "@material-ui/icons/SupervisorAccount";
import LockIcon from "@material-ui/icons/Lock";

import * as Yup from "yup";
import { Form, Formik } from "formik";

const RegisterSchema = Yup.object().shape({
  userName: Yup.string()
    .required("User Name is required")
    .min(3, "User Name Too Short!")
    .max(250, "User Name Too Long!"),
  firstName: Yup.string()
    .required("First Name is required")
    .min(2, "First Name Too Short!")
    .max(250, "First Name Too Long!"),
  lastName: Yup.string()
    .required("Last Name is required")
    .min(2, "Last Name Too Short!")
    .max(250, "Last Name Too Long!"),
  password: Yup.string().required("password is required"),
});

export function RegisterPage() {
  const userFeild: IUserRegister = {
    userName: "",
    firstName: "",
    lastName: "",
    password: "",
  };

  const alert = useSelector((state: IAllState) => state.alertReducer);
  const [userDetails, setUserDetails] = useState(userFeild);
  const history = useHistory();
  const dispatch = useDispatch();

  function onChangeUserDetails(key: string, value: string) {
    setUserDetails({ ...userDetails, [key]: value });
  }

  async function sendRegisterReuqest() {
    if (
      !userDetails.userName ||
      !userDetails.firstName ||
      !userDetails.lastName ||
      !userDetails.password
    )
      return;
    const result = await registerUserAction(userDetails);
    if (!result) return;

    const { complete } = result;
    if (complete == true)
      setTimeout(() => {
        history.push("/login");
      }, 1500);
  }

  useEffect(() => {
    dispatch({ type: ACTIONS.ALERT_MESSAGE.CLEAR, payload: "" });
  }, []);
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
            onSubmit={sendRegisterReuqest}
            validationSchema={RegisterSchema}
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
                    <h2>Register please</h2>
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
                        label="User Name"
                        value={values.userName}
                        onChange={(e) => {
                          handleChange(e);
                          let userName = e.currentTarget.value;
                          onChangeUserDetails(e?.target.name, userName);
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
                        id="firstName"
                        name="firstName"
                        label="First Name"
                        value={values.firstName}
                        onChange={(e) => {
                          handleChange(e);
                          let firstName = e.currentTarget.value;
                          onChangeUserDetails(e?.target.name, firstName);
                        }}
                        onBlur={handleBlur}
                        helperText={touched.firstName ? errors.firstName : ""}
                        error={touched.firstName && Boolean(errors.firstName)}
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
                        id="lastName"
                        name="lastName"
                        label="Last Name"
                        value={values.lastName}
                        onChange={(e) => {
                          handleChange(e);
                          let lastName = e.currentTarget.value;
                          onChangeUserDetails(e?.target.name, lastName);
                        }}
                        onBlur={handleBlur}
                        helperText={touched.lastName ? errors.lastName : ""}
                        error={touched.lastName && Boolean(errors.lastName)}
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
                        name="password"
                        label="Password"
                        type="password"
                        value={values.password}
                        onChange={(e) => {
                          handleChange(e);
                          let password = e.currentTarget.value;
                          onChangeUserDetails(e?.target.name, password);
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
                      <Button
                        onClick={sendRegisterReuqest}
                        variant="contained"
                        color="secondary"
                      >
                        Register
                      </Button>

                      <Link to="/login">
                        <Button variant="contained" color="primary">
                          Login
                        </Button>
                      </Link>
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
