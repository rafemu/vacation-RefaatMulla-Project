import ACTIONS from "../actions";

export interface IState {
  projects: Array<any>;
  project: any;
  projectTimeSheet: Array<any>;
  employees: Array<any>;
}

const initialState: IState = {
  projects: [],
  project: null,
  projectTimeSheet: [],
  employees: [],
};
function mainReducer(state = initialState, action: any) {
  switch (action.type) {
    case ACTIONS.PROJECTS.GET_PROJECTS_DONE: {
      return { ...state, projects: [...action.payload] };
    }

    case ACTIONS.PROJECTS.GET_PROJECT_DONE: {
      return { ...state, project: action.payload };
    }

    case ACTIONS.PROJECTS.GET_PROJECT_WITH_TIMESHEET_DONE: {
      return { ...state, projectTimeSheet: [...action.payload] };
    }

    case ACTIONS.EMPLOYEES.GET_EMPLOYEES_DONE: {
      return { ...state, employees: [...action.payload] };
    }

    // case ACTIONS.REGISTER.USER_REGISTRATION_FAILED: {
    //     alert(action.payload)
    //     return state;
    // }

    // case ACTIONS.REGISTER.USER_REGISTRATION_PENDING: {

    //     return state;
    // }

    // case ACTIONS.ACCOUNTS.GET_ACCOUNTS_SUCCESS: {
    //     return { ...state, accounts: [...action.payload] };
    // }
    // case ACTIONS.USERS.GET_USERS_SUCCESS: {
    //     return { ...state, users: [...action.payload] };
    // }
    // case ACTIONS.ACCOUNTS.GET_ACCOUNT_SUCCESS: {
    //     return { ...state, account: action.payload };
    // }

    default: {
      return state;
    }
  }
}

export default mainReducer;
