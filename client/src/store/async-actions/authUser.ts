import { IUser } from "../../interfaces";
import ACTIONS from "../actions";
import store from "../index";
import { loginService } from "../services/auth.service";
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
    return result;
  } catch (ex) {
    console.log(ex);
    dispatch({
      type: ACTIONS.ALERT_MESSAGE.ALERT_ERROR,
      payload: ex.toString(),
    });
  }
}

function LogOut() {
  localStorage.removeItem("VacationApp");
  dispatch({
    type: ACTIONS.LOGOUT.LOGOUT_SUCCESS,
  });
}
export { LoginAction, LogOut };
