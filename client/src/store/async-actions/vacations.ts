import ACTIONS from "../actions";
import store from "../index";
import { getVacationsService } from "../services/vacations.service";

const { dispatch } = store;

export default async function getVacationsAction(userId?: number) {
  try {
    const result = await getVacationsService();
    console.log("result", result);
    dispatch({ type: ACTIONS.VACATIONS.GET_VACATION_SUCCESS, payload: result });
  } catch (error) {
    dispatch({ type: ACTIONS.VACATIONS.GET_VACATION_ERROR, payload: error });
    console.log(error);
    dispatch({ type: ACTIONS.LOGOUT.LOGOUT_SUCCESS });
  }
}
