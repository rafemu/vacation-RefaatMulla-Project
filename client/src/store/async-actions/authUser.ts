import { IUser, IUserRegister } from "../../interfaces";
import ACTIONS from "../actions";
import store from "../index";
import { loginService, registerService } from "../services/auth.service";
import { setToken } from "../services/token.service";

const { dispatch } = store;

async function LoginAction(userDetails: IUser) {
  try {
    const result = await loginService(userDetails);
    if (!result.accessToken) throw new Error(result.message);
    setToken(result.accessToken);
    dispatch({
      type: ACTIONS.LOGIN.LOGIN_SUCCESS,
      payload: result,
    });
    dispatch({
      type: ACTIONS.ALERT_MESSAGE.ALERT_SUCCESS,
      payload: "Login successfully",
    });
    return result;
  } catch (ex) {
    dispatch({
      type: ACTIONS.ALERT_MESSAGE.ALERT_ERROR,
      payload: ex.message,
    });
  }
}

async function registerUserAction(userDetails: IUserRegister) {
  try {
    const result = await registerService(userDetails);
    dispatch({
      type: ACTIONS.REGISTER.USER_REGISTRATION_SUCCESS,
      payload: result,
    });
    dispatch({
      type: ACTIONS.ALERT_MESSAGE.ALERT_SUCCESS,
      payload: result.message,
    });
    return result;
  } catch (ex) {
    console.log(ex);
    dispatch({
      type: ACTIONS.ALERT_MESSAGE.ALERT_ERROR,
      payload: ex.message,
    });
  }
}
function LogOut() {
  localStorage.removeItem("VacationApp");
  dispatch({
    type: ACTIONS.LOGOUT.LOGOUT_SUCCESS,
  });
}
export { LoginAction, registerUserAction, LogOut };
