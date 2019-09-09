import { userConstants } from '../constants';

const initialState = { loggedIn: false,
                       loggingIn: false,  
                       loggingError: null,
                       user: null
                    };

export function authentication(state = initialState, action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: null
      };
    case userConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        loggingIn: false,
        loggingError: null,
        user: action.user
      };
    case userConstants.LOGIN_FAILURE:
      return {
        loggedIn: false,
        loggingIn: false,
        loggingError: "Login failed",
        user: null
      };
    case userConstants.LOGOUT:
      return {
        loggedIn: false,
        loggingIn: false,
        user: null
      };
    default:
      return state
  }
}