import { userConstants } from '../constants'
import { userService} from "../services"
import { navigate } from "@reach/router"

function login(username, password) {
  return async dispatch => {
    dispatch(request({ username }));
    try {
      const data = await userService.login(username, password);
      dispatch(success(data));
      await navigate('/app')
    } catch (error) {
      dispatch(failure(error));
      throw error;
    }
  };

  function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
  function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
  function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

export const userActions = {
  login,
  logout
}
