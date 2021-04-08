import ACTIONS from "../actions";

export interface IAlertState {
  type: null;
  message: string;
}

const initialState: IAlertState = {
  type: null,
  message: "",
};

function alertReducer(state = initialState, action: any) {
  switch (action.type) {
    case ACTIONS.ALERT_MESSAGE.ALERT_SUCCESS:
      return { ...state, type: "success", message: action.payload };
    case ACTIONS.ALERT_MESSAGE.ALERT_ERROR:
      return { ...state, type: "error", message: action.payload };

    case ACTIONS.ALERT_MESSAGE.CLEAR:
      return {};

    default: {
      return state;
    }
  }
}

export default alertReducer;
