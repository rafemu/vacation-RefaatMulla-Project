import ACTIONS from "../actions";
import store from "../index";
import {
  deleteVacationByIdService,
  getVacationsService,
  editeVacationsService,
  followVacationsService,
} from "../services/vacations.service";

const { dispatch } = store;

async function getVacationsAction(userId?: number) {
  try {
    const result = await getVacationsService();
    console.log("result", result);
    dispatch({ type: ACTIONS.VACATIONS.GET_VACATION_SUCCESS, payload: result });
  } catch (error) {
    dispatch({ type: ACTIONS.VACATIONS.GET_VACATION_ERROR, payload: error });
    dispatch({ type: ACTIONS.LOGOUT.LOGOUT_SUCCESS });
  }
}

async function deleteVacationByIdAction(vacationId: number) {
  try {
    const result = await deleteVacationByIdService(vacationId);
  } catch (error) {}
}

async function editVacationAction(vacationId: number, vacationDetails: any) {
  try {
    const result = await editeVacationsService(vacationId, vacationDetails);
    console.log("result", result);
    //  dispatch({ type: ACTIONS.VACATIONS.GET_VACATION_SUCCESS, payload: result });
  } catch (error) {
    // dispatch({ type: ACTIONS.VACATIONS.GET_VACATION_ERROR, payload: error });
    // dispatch({ type: ACTIONS.LOGOUT.LOGOUT_SUCCESS });
  }
}

async function followVacationByIdAction(vacationId: any) {
  try {
    const result = await followVacationsService(vacationId);
    return result;
  } catch (error) {}
}

export {
  getVacationsAction,
  deleteVacationByIdAction,
  editVacationAction,
  followVacationByIdAction,
};
