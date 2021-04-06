import ACTIONS from "../actions";

export interface IAlertState {
  type: string;
  message: string;
}

const initialState: IAlertState = {
  type: "",
  message: "",
};

function alertReducer(state = initialState, action: any) {
  switch (action.type) {
    case ACTIONS.ALERT_MESSAGE.ALERT_SUCCESS:
      return { ...state, type: "alert-success", message: action.message };
    case ACTIONS.ALERT_MESSAGE.ALERT_ERROR:
      return { ...state, type: "alert-danger", message: action.message };

    case ACTIONS.ALERT_MESSAGE.CLEAR:
      return {};

    default: {
      return state;
    }
  }
}

export default alertReducer;
