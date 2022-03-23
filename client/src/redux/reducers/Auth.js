import { AUTH, LOGOUT } from "../constants/actionsType";

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTH:
      if (action.data && action.data != undefined) {
        localStorage.setItem("profile", JSON.stringify({ ...action.data }));
      }
      return {...state , authData:action.data}
    case LOGOUT:
       localStorage.clear();
      return {...state , authData:null}

    default:
      return state;
  }
};

export default authReducer;
