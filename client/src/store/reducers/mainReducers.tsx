import { IVacation } from "../../interfaces";
import ACTIONS from "../actions";
import { getToken, getPayload } from "../services/token.service";

export interface IState {
  vacations: Array<IVacation>;
  message: string;
  currentUser: any;
  // userName: string | null;
  // users: Array<any>;
  // account: any;
}

const user = getToken();
const initialState: IState = {
  vacations: [],
  message: "",
  currentUser: user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: {} },
  // users: [],
  // userName: null,
  // account: null,
};

console.log(initialState);
function mainReducer(state = initialState, action: any) {
  switch (action.type) {
    case ACTIONS.VACATIONS.GET_VACATION_SUCCESS: {
      return { ...state, vacations: [...action.payload] };
    }
    case ACTIONS.MESSAGE.SET_MESSAGE:
      return { ...state, message: action.payload };

    case ACTIONS.MESSAGE.CLEAR_MESSAGE:
      return { ...state, message: "" };

    case ACTIONS.LOGIN.LOGIN_SUCCESS: {
      // alert(action.payload.message);
      // console.log(action.payload.message);

      return { ...state, isLoggedIn: true, currentUser: action.payload };
    }
    // case ACTIONS.LOGIN.LOGIN_FAIL: {
    //   return {
    //     ...state,
    //   };
    // }

    case ACTIONS.LOGOUT.LOGOUT_SUCCESS: {
      return { ...state, isLoggedIn: false, currentUser: {} };
    }

    default: {
      return state;
    }
  }
}

export default mainReducer;
