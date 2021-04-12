import ACTIONS from "../actions";
import store from "../index";
import {
  deleteVacationByIdService,
  getVacationsService,
  editeVacationsService,
  followVacationsService,
} from "../services/vacations.service";

const { dispatch } = store;

async function getVacationsAction(searchValue?: string) {
  try {
    const result = await getVacationsService();
    if (searchValue) {
      if (typeof searchValue !== "string") return;
      const filterR = result.find((vacation: any) => {
        return vacation.destination
          .toLowerCase()
          .includes(searchValue.toLocaleLowerCase());
      });
      if (!filterR) return;
      dispatch({
        type: ACTIONS.VACATIONS.GET_VACATION_SUCCESS,
        payload: Object.values({ filterR }),
      });
      console.log(Object.values({ filterR }));
    } else {
      dispatch({
        type: ACTIONS.VACATIONS.GET_VACATION_SUCCESS,
        payload: result,
      });
    }
    console.log(result);
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
  } catch (error) {
    console.log(error);
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
