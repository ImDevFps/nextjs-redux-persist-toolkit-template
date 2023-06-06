import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import { HYDRATE } from "next-redux-wrapper";

const combinedReducer = combineReducers({
  [userReducer.name]: userReducer.reducer,
});

const rootReducer: (
  state: any,
  action: any
) => ReturnType<typeof combinedReducer> = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state, // use previous state
      user: action.payload.user,
    };

    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};

export type RootState = ReturnType<typeof combineReducers>;

export default rootReducer;
