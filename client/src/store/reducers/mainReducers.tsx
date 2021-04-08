import { IVacation } from "../../interfaces";
import ACTIONS from "../actions";
import { getToken } from "../services/token.service";

export interface IState {
  vacations: Array<IVacation>;
  currentUser: any;
}

const user = getToken();
const initialState: IState = {
  vacations: [],
  currentUser: user
    ? { isLoggedIn: true, user }
    : { isLoggedIn: false, user: {} },
};

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
    default: {
      return state;
    }
  }
}

export default mainReducer;
