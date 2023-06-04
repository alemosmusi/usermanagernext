import * as actionTypes from "../action-types/";

const initialState = {
  Proyectos: [],
};


const rootReducer = (state = initialState, action) => {


  switch (action.type) {
    case actionTypes.GET_PROYECTOS:
      return {
        ...state,
        Proyectos: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
