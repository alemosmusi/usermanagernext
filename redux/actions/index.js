import Axios from "axios";
import * as actionTypes from "../action-types";

Axios.defaults.baseURL = 'https://backbcdesarrollo-production.up.railway.app/api/'
// Axios.defaults.baseURL = "http://localhost:3001/api";

export const getProyectos = () => {


  return async function (dispatch) {
    try {
      let info =  await Axios('getallproyectos');
      return dispatch({
        type: actionTypes.GET_PROYECTOS,
        payload: info.data,
      });
    } catch (error) {
      return "error";
    }
  };
};
