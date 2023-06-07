import Axios from "axios";
import * as actionTypes from "../action-types";

// Axios.defaults.baseURL = "http://localhost:3001/api";




export const sesionLog = (userLog) => {
  
  

  return async function (dispatch) {
    try {
      return dispatch({
        type: actionTypes.USER_LOG,
        payload: userLog,
      });
    } catch (error) {
      return "error";
    }
  };
};
