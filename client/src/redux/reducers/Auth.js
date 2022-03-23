import { AUTH, LOGOUT } from "../constants/actionsType";

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH:
      if (action.data && action.data != undefined) {
        localStorage.setItem("profile", JSON.stringify({ ...action.data }));
      }
      return {...state , aythData:action.data}
    case LOGOUT:
      return state;

    default:
      return state;
  }
};

export default authReducer;
