import * as actionTypes from "../action-types/";

const initialState = {
  UserLog: {},
};


const rootReducer = (state = initialState, action) => {


  switch (action.type) {
    case actionTypes.USER_LOG:
      return {
        ...state,
        UserLog: action.payload,
      };

    default:
      return state;
  }
};

export default rootReducer;
