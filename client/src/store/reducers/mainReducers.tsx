import { IVacation } from "../../interfaces";
import ACTIONS from "../actions";
import { getToken, getPayload } from "../services/token.service";

export interface IState {
  vacations: Array<IVacation>;
  message: string;
  currentUser: any;
}

const user = getToken();
const initialState: IState = {
  vacations: [],
  message: "",
  currentUser: user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: {} },
};

console.log(initialState);
function mainReducer(state = initialState, action: any) {
  switch (action.type) {
    case ACTIONS.VACATIONS.GET_VACATION_SUCCESS: {
      return { ...state, vacations: [...action.payload] };
    }

    case ACTIONS.LOGIN.LOGIN_SUCCESS: {
      return { ...state, isLoggedIn: true, currentUser: action.payload };
    }
    case ACTIONS.LOGIN.LOGIN_FAIL: {
      return {
        ...state,
        isLoggedIn: false,
        currentUser: {},
      };
    }

    case ACTIONS.LOGOUT.LOGOUT_SUCCESS: {
      return { ...state, isLoggedIn: false, currentUser: {} };
    }

    case ACTIONS.ALERT_MESSAGE.ALERT_SUCCESS:
      return { ...state, message: action.payload };
    case ACTIONS.ALERT_MESSAGE.ALERT_ERROR:
      return { ...state, message: action.payload };

    case ACTIONS.ALERT_MESSAGE.CLEAR:
      return { ...state, message: "" };

    default: {
      return state;
    }
  }
}

export default mainReducer;
