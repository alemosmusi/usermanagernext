import Axios from "axios";
import * as actionTypes from "../action-types";
import { useAuth } from "@/context/AuthContext";

// Axios.defaults.baseURL = "http://localhost:3001/api";




// export const createNewUser = (newUser) => {
//   const { login, signup, currentUser } = useAuth();
  

//   return async function (dispatch) {
//     try {

//       let info =  await signup(newUser.email, newUser.password);
//       return dispatch({
//         type: actionTypes.NEW_USER,
//         payload: info.data,
//       });
//     } catch (error) {
//       return "error";
//     }
//   };
// };
